import RequestError from "../Errors/RequestError.js";
import Participant from "../Models/Participant.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import CloudinaryService from "./CloudinaryService.js";
import Event from "../Models/Event.js";
import Question from "../Models/Question.js";
import SchedulerService from "./SchedulerService.js";
import createTransaction from "../Utils/Transaction.js";
import DateUtil from "../Utils/DateUtil.js";

class VolunteerService {
    async addVolunteerWork(org, jsonData, file) {
        return await createTransaction(async (session) => {
            var volunteerWork = JSON.parse(jsonData);
            if (!volunteerWork.title) throw new RequestError("Title is required");
            if (!volunteerWork.receivedCoins) throw new RequestError("ReceivedCoins is required");

            volunteerWork.createdAt = new Date();
            volunteerWork.organization = org._id;

            if (Array.isArray(volunteerWork.events) && volunteerWork.events.length > 0) {
                const savedEvents = await Event.insertMany(volunteerWork.events, { session });
                volunteerWork.events = [];
                for (var savedEvent of savedEvents) {
                    volunteerWork.events.push(savedEvent._id);
                    SchedulerService.scheduleEvent(volunteerWork, savedEvent);
                }
            }

            if (file) {
                volunteerWork.imageUrl = await CloudinaryService.uploadImage(file, null);
            }

            var savedVolunteerWork = (await VolunteerWork.create([volunteerWork], { session }))[0];
            return savedVolunteerWork;
        });
    }

    async getVolunteerWorkInfo(volunteerWorkId) {
        return await VolunteerWork.findById(volunteerWorkId)
            .populate("organization")
            .populate({ path: "questions", populate: { path: "studentId" } })
            .populate("events")
            .exec();
    }

    async searchByTitle(searchString) {
        return await VolunteerWork.find({ $text: { $search: searchString } }).limit(10);
    }

    async getVolunteerWorks({ page, limit }) {
        if (limit <= 0) throw new RequestError("Limit must be positive");
        if (page <= 0) page = 1;

        var volunteerWorks = await VolunteerWork.findWithPagination(page, limit);
        var total = await VolunteerWork.countAll();

        return {
            data: volunteerWorks,
            pagination: { total, currentPage: page }
        };
    }

    async getOrgVolunteerWorks(orgId, { page, limit }) {
        if (limit <= 0) throw new RequestError("Limit must be positive");
        if (page <= 0) page = 1;

        var volunteerWorks = await VolunteerWork.findWithPaginationAndOrgId(page, limit, orgId);
        var total = await VolunteerWork.countByOrgId(orgId);

        return {
            data: volunteerWorks,
            pagination: { total, currentPage: page }
        };
    }

    async getEventsOfWeek(student, week) {
        const weekRange = DateUtil.getWeekDateRange(week);
        console.log("Week range", weekRange);

        var volunteerWorkIds = await Participant.findVolunteerWorkIdsByStudentId(student._id);
        var volunteerWorks = await VolunteerWork.findWithEvents(volunteerWorkIds, weekRange);

        var events = [];
        for (const volunteerWork of volunteerWorks) {
            if (volunteerWork.events) {
                for (var event of volunteerWork.events) {
                    events.push({ ...event.toObject(), volunteerWorkTitle: volunteerWork.title });
                }
            }
        }

        return { data: events, weekRange };
    }

    async getRegisteredVolunteerWorks(student) {
        var volunteerWorkIds = await Participant.findVolunteerWorkIdsByStudentId(student._id);
        return await VolunteerWork.findByIds(volunteerWorkIds);
    }

    async addEvent(event) {
        if (event.startDate > event.endDate) {
            throw new RequestError("Start date must be before than end date");
        }

        var volunteerWork = await VolunteerWork.findById(event.volunteerWorkId);
        if (!volunteerWork) throw new RequestError("VolunteerWork of the event does not exist");

        return await createTransaction(async (session) => {
            var savedEvent = (await Event.create([event], { session }))[0];
            if (!volunteerWork.events) volunteerWork.events = [];
            volunteerWork.events.push(savedEvent._id);
            await volunteerWork.save({ session });
            SchedulerService.scheduleEvent(volunteerWork, savedEvent);
            return savedEvent;
        });
    }

    async deleteEvent(eventId) {
        var event = await Event.findById(eventId);
        if (!event) throw new RequestError("EventId " + eventId + " does not exist");

        SchedulerService.deleteScheduledEvent(eventId);
        await event.deleteOne();
    }

    async addQuestion(student, question) {
        return await createTransaction(async (session) => {
            if (!question.questionText || question.questionText.trim() === "") {
                throw new RequestError("Please fill in your question about this volunteer work");
            }

            var volunteerWork = await VolunteerWork.findById(question.volunteerWorkId);
            if (!volunteerWork) throw new RequestError("VolunteerWork of this question does not exist");

            question.studentId = student._id;
            question.createdAt = new Date();

            var savedQuestion = (await Question.create([question], { session }))[0];
            console.log("questionId", savedQuestion._id);

            if (!volunteerWork.questions) {
                volunteerWork.questions = [savedQuestion._id];
            } else {
                volunteerWork.questions.push(savedQuestion._id);
            }

            await volunteerWork.save({ session });
            return savedQuestion;
        });
    }

    async answerQuestion({ questionId, answer }) {
        var question = await Question.findById(questionId);
        if (!question) throw new RequestError("QuestionId " + questionId + " does not exist");

        question.answer = answer;
        await question.save();
    }

    async updateVolunteerWork(jsonData, file) {
        var uVolunteerWork = JSON.parse(jsonData);
        var sVolunteerWork = await VolunteerWork.findById(uVolunteerWork._id);

        if (!sVolunteerWork) throw new RequestError("VolunteerWorkId " + uVolunteerWork._id + " does not exist");

        if (file) {
            sVolunteerWork.imageUrl = await CloudinaryService.uploadImage(file, sVolunteerWork.imageUrl);
        }

        const updatedFields = [
            "title",
            "endRegisteredDate",
            "description",
            "receivedCoins",
            "needDonation",
            "contactInfo",
            "requirements",
            "benefits"
        ];

        for (var updatedField of updatedFields) {
            if (uVolunteerWork.hasOwnProperty(updatedField)) {
                sVolunteerWork[updatedField] = uVolunteerWork[updatedField];
            }
        }

        await sVolunteerWork.save();
        return sVolunteerWork;
    }

    async deleteVolunteerWork(volunteerWorkId) {
        var volunteerWork = await VolunteerWork.findById(volunteerWorkId);
        if (!volunteerWork) throw new RequestError("VolunteerWorkId " + volunteerWorkId + " does not exist");

        return await createTransaction(
            async (session) => {
                SchedulerService.deleteScheduledEvents(volunteerWork.events);
                await Event.deleteMany({ _id: { $in: volunteerWork.events } }).session(session);
                await Question.deleteMany({ _id: { $in: volunteerWork.questions } }).session(session);
                await Participant.deleteMany({ volunteerWorkId: volunteerWork._id }).session(session);
                CloudinaryService.deleteImage(volunteerWork.imageUrl);
                await volunteerWork.deleteOne().session(session);
            },
            async () => {
                await SchedulerService.recoverScheduledEvents(volunteerWork);
            }
        );
    }
}

export default new VolunteerService();
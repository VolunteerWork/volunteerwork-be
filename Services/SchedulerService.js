import Participant from "../Models/Participant.js";
import Student from "../Models/Student.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import EmailService from "./EmailService.js";
import schedule from "node-schedule";

class SchedulerService {
    async loadScheduledEvents() {
        var volunteerWorks = await VolunteerWork.find().populate("events");
        for (var volunteerWork of volunteerWorks) {
            for (var event of volunteerWork.events) {
                this.scheduleEvent(volunteerWork, event, true);
            }
        }
    }

    scheduleEvent(volunteerWork, event, noDeletion) {
        if (!noDeletion) this.deleteScheduledEvent(event._id);
        if (!event.startDate) return;

        var scheduledDate = new Date(event.startDate);
        scheduledDate.setDate(-1);

        var now = new Date();
        if (scheduledDate > now) {
            schedule.scheduleJob(event._id.toString(), scheduledDate, async () => {
                var studentIds = await Participant.findStudentIdsByVolunteerWorkId(volunteerWork._id);
                var students = await Student.findByIds(studentIds);
                EmailService.remindUpcomingVolunteerWork(students, event);
            });
        }
    }

    async recoverScheduledEvents(volunteerWork) {
        await volunteerWork.populate("events");
        for (var event of volunteerWork.events) {
            const job = schedule.scheduledJobs[event._id.toString()];
            if (!job) this.scheduleEvent(volunteerWork, event, true);
        }
    }

    deleteScheduledEvent(eventId) {
        if (eventId instanceof Object && eventId.constructor.name === "ObjectID") {
            eventId = eventId.toString();
        }
        const job = schedule.scheduledJobs[eventId];
        if (job) job.cancel();
    }

    deleteScheduledEvents(eventIds) {
        for (var eventId in eventIds) {
            this.deleteScheduledEvent(eventId);
        }
    }
}

export default new SchedulerService();
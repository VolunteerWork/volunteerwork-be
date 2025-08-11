import VolunteerService from "../Services/VolunteerService.js";

class VolunteerController {
    async addVolunteerWork(req, res, next) {
        try {
            const volunteerWork = await VolunteerService.addVolunteerWork(
                req.org,
                req.body.jsonData,
                req.file
            );
            return res.status(200).json(volunteerWork);
        } catch (error) {
            next(error);
        }
    }

    async getVolunteerWorkInfo(req, res, next) {
        try {
            const volunteerWork = await VolunteerService.getVolunteerWorkInfo(
                req.params["volunteerWorkId"]
            );
            return res.status(200).json(volunteerWork);
        } catch (error) {
            next(error);
        }
    }

    async searchByTitle(req, res, next) {
        try {
            const volunteerWorks = await VolunteerService.searchByTitle(req.query["searchString"]);
            return res.status(200).json(volunteerWorks);
        } catch (error) {
            next(error);
        }
    }

    async getVolunteerWorks(req, res, next) {
        try {
            const volunteerWorks = await VolunteerService.getVolunteerWorks(req.query);
            return res.status(200).json(volunteerWorks);
        } catch (error) {
            next(error);
        }
    }

    async getOrgVolunteerWorks(req, res, next) {
        try {
            const volunteerWorks = await VolunteerService.getOrgVolunteerWorks(
                req.params["orgId"],
                req.query
            );
            return res.status(200).json(volunteerWorks);
        } catch (error) {
            next(error);
        }
    }

    async getRegisteredVolunteerWorks(req, res, next) {
        try {
            const volunteerWorks = await VolunteerService.getRegisteredVolunteerWorks(req.student);
            return res.status(200).json(volunteerWorks);
        } catch (error) {
            next(error);
        }
    }

    async getEventsOfWeek(req, res, next) {
        try {
            const result = await VolunteerService.getEventsOfWeek(
                req.student,
                req.query["week"]
            );
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async addEvent(req, res, next) {
        try {
            const event = await VolunteerService.addEvent(req.body);
            return res.status(200).json(event);
        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req, res, next) {
        try {
            await VolunteerService.deleteEvent(req.params["id"]);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async addQuestion(req, res, next) {
        try {
            const question = await VolunteerService.addQuestion(req.student, req.body);
            return res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    }

    async answerQuestion(req, res, next) {
        try {
            await VolunteerService.answerQuestion(req.body);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async updateVolunteerWork(req, res, next) {
        try {
            const volunteerWork = await VolunteerService.updateVolunteerWork(
                req.body.jsonData,
                req.file
            );
            return res.status(200).json(volunteerWork);
        } catch (error) {
            next(error);
        }
    }

    async deleteVolunteerWork(req, res, next) {
        try {
            await VolunteerService.deleteVolunteerWork(req.params["id"]);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default new VolunteerController();
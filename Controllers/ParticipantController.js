import ParticipantService from "../Services/ParticipantService.js";

class ParticipantController {
    async joinVolunteerWork(req, res, next) {
        try {
            const participant = await ParticipantService.joinVolunteerWork(req.student, req.body);
            return res.status(200).json(participant);
        } catch (error) {
            next(error);
        }
    }

    async acceptParticipant(req, res, next) {
        try {
            const participant = await ParticipantService.acceptParticipant(req.org, 
              req.params["participantId"], 
              req.query["isAccepted"]);
            return res.status(200).json(participant);
        } catch (error) {
            next(error);
        }
    }

    async giveFeedBack(req, res, next) {
        try {
            const participant = await ParticipantService.giveFeedback(req.body);
            return res.status(200).json(participant);
        } catch (error) {
            next(error);
        }
    }

    async getParticipants(req, res, next) {
        try {
            const participants = await ParticipantService.getParticipants(req.query);
            return res.status(200).json(participants);
        } catch (error) {
            next(error);
        }
    }

    async getFinishedParticipants(req, res, next) {
        try {
            const participants = await ParticipantService.getFinishedParticipants(req.params["id"]);
            return res.status(200).json(participants);
        } catch (error) {
            next(error);
        }
    }
}

export default new ParticipantController();
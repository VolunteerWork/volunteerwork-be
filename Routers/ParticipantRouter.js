import express from "express"
import ParticipantController from "../Controllers/ParticipantController.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";

const ParticipantRouter=express.Router();

ParticipantRouter.post("/join-volunteer-work",StudentMiddleware,ParticipantController.joinVolunteerWork);

ParticipantRouter.post("/accept",OrgMiddleware, ParticipantController.acceptParticipant);

ParticipantRouter.post("/feedback",OrgMiddleware,ParticipantController.giveFeedBack);

ParticipantRouter.get("/all",ParticipantController.getParticipants);

ParticipantRouter.get("/finished-participants/:id",ParticipantController.getFinishedParticipants);



export default ParticipantRouter;
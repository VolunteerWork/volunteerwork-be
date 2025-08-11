import express from "express"
import VolunteerController from "../Controllers/VolunteerController.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";

const VolunteerRouter=express.Router();

// add a new volunteer work
VolunteerRouter.post("/",OrgMiddleware,UploadMiddleware,VolunteerController.addVolunteerWork);

// get info of a volunteer work. Provide volunteerWorkId as a param
VolunteerRouter.get("/:volunteerId",VolunteerController.getVolunteerWorkInfo);

VolunteerRouter.get("/search-by-title", VolunteerController.searchByTitle);

// get all volunteer work existed in db
VolunteerRouter.post("/all",VolunteerController.getVolunteerWorks);

// get all volunteer work of an organization
VolunteerRouter.post("/org/:orgId",VolunteerController.getOrgVolunteerWorks);

// get all volunteer work that a student has registered
VolunteerRouter.get("/registered-volunteer-works",StudentMiddleware,VolunteerController.getRegisteredVolunteerWorks);

// get all events that a student may attend during a time range. This endpoint is useful for making time table.
VolunteerRouter.get("/events-of-week",StudentMiddleware,VolunteerController.getEventsOfWeek);

// add a new event to a volunteer work
VolunteerRouter.post("/new-event",OrgMiddleware,VolunteerController.addEvent);

// delete an event
VolunteerRouter.delete("/delete-event/:id",OrgMiddleware,VolunteerController.deleteEvent);

// this endpoint is used for student to raise question about the volunteer work
VolunteerRouter.post("/add-question",StudentMiddleware,VolunteerController.addQuestion);

// the admin of organization answer the question
VolunteerRouter.post("/answer-question",OrgMiddleware,VolunteerController.answerQuestion);

// update volunteer work
VolunteerRouter.put("/",OrgMiddleware,UploadMiddleware,VolunteerController.updateVolunteerWork);

// delete a volunteer work
VolunteerRouter.delete("/:id",OrgMiddleware,VolunteerController.deleteVolunteerWork);

export default VolunteerRouter;
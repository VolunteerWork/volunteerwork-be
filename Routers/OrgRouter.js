import express from "express";
import OrgController from "../Controllers/OrgController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";

const OrgRouter=express.Router();

// get info of logined organization
OrgRouter.get("/me", OrgMiddleware,OrgController.getLoginedInfo);

// get general info of an organization
OrgRouter.get("/:id",OrgController.getOrganizationById);

OrgRouter.get("/search-by-name", OrgController.searchByName);

// upload avatar
OrgRouter.post("/upload-avatar", OrgMiddleware, UploadMiddleware, OrgController.uploadAvatar);

// admin verify organization
OrgRouter.post("/verify/:id", AdminMiddleware, OrgController.verifyOrganization);

// update organization
OrgRouter.put("/", OrgMiddleware, OrgController.updateOrganization);

// get organization with pagination
OrgRouter.get("/", OrgController.getOrganizations);

export default OrgRouter;
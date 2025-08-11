import express from "express";
import StudentController from "../Controllers/StudentController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";


const StudentRouter=express.Router();

// get logined student info
StudentRouter.get("/me",StudentMiddleware,StudentController.getLoginedInfo);

// get general info of a student
StudentRouter.get("/:studentId", StudentController.getStudentInfo);

// upload avatar
StudentRouter.post("/upload-avatar", StudentMiddleware, UploadMiddleware, StudentController.uploadAvatar);

// update student info
StudentRouter.put("/", StudentMiddleware, StudentController.updateStudent);

// get top 10 students that has highest points
StudentRouter.get("/top-10-students", StudentController.getTop10Students);

export default StudentRouter;
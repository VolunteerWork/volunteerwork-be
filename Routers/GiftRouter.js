import express from "express"
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";
import GiftController from "../Controllers/GiftController.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";

const GiftRouter=express.Router();

// the admin (role=ADMIN) add a new gift
GiftRouter.post("/", AdminMiddleware,UploadMiddleware, GiftController.addGift);

// get all gifts that haven't been awarded
GiftRouter.get("/",GiftController.getGifts);

// a student registers to receive a gift
GiftRouter.post("/awardGift", StudentMiddleware, GiftController.awardGift);

export default GiftRouter;

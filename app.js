import express from "express";
import cors from "cors";
import { connectDatabase } from "./Config/DBConfig.js";
import { FRONTEND_ORIGINS, APP_PORT } from "./Config/index.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import AuthRouter from "./Routers/AuthRouter.js";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";
import OrgRouter from "./Routers/OrgRouter.js";
import StudentRouter from "./Routers/StudentRouter.js";
import VolunteerRouter from "./Routers/VolunteerRouter.js";
import ParticipantRouter from "./Routers/ParticipantRouter.js";
import GiftRouter from "./Routers/GiftRouter.js";
import SchedulerService from "./Services/SchedulerService.js";
import { embbedLoggerToSystemLog } from "./Config/LoggerConfig.js";
import healthcheck from "express-healthcheck";

const app=express();

embbedLoggerToSystemLog();
connectDatabase();
SchedulerService.loadScheduledEvents();

app.use(cors({
          origin: [FRONTEND_ORIGINS],
          credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/healthcheck", healthcheck());
app.use("/api/auth",AuthRouter);
app.use("/api/student",StudentRouter);
app.use("/api/organization",OrgRouter);
app.use("/api/volunteerwork",VolunteerRouter);
app.use("/api/participant",ParticipantRouter);
app.use("/api/gift",GiftRouter);

app.use(ErrorMiddleware);

app.listen(APP_PORT, ()=>{
          console.log("Server is opened");
})
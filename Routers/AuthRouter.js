import express from 'express';
import AuthController from '../Controllers/AuthController.js';

const AuthRouter=express.Router();

AuthRouter.post("/login",AuthController.login);

AuthRouter.post("/registry-student",AuthController.registryStudent);

AuthRouter.post("/registry-organization",AuthController.registryOrganization);

AuthRouter.post("/send-otp-code",AuthController.sendOTPcode);

AuthRouter.post("/active-account",AuthController.activeAccount);

AuthRouter.post("/change-password",AuthController.changePassword);

AuthRouter.post("/logout",AuthController.logOut);

export default AuthRouter;
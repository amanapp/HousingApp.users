import express from 'express'
import { VerifyOwner, VerifyUser } from "../controllers/verification.controller";
import { VerifyOtpSendUser } from "../controllers/verification_otp_send.conroller";


const routes =express.Router();

routes.post('/otp-send',VerifyOtpSendUser)
routes.post('/user/verify',VerifyUser)
routes.post('/owner/verify',VerifyOwner)

export default routes;
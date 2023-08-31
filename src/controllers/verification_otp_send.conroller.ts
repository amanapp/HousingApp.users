import { Response, Request } from "express";
import { verifyUser } from "../services/verification.services";
import { verifyOtpSendUser } from "../services/verification_otp_send";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description send the otp to verify the user 
 * @param req 
 * @param res 
 */
export const VerifyOtpSendUser = async (req: Request, res: Response) => {
  try {
    const email = req.body;

    const user = await verifyOtpSendUser(email);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.OTP_SEND });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

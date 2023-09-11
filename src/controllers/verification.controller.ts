import { Response, Request } from "express";
import { verifyOwner, verifyUser } from "../services/verification.services";
import { HttpStatusCode } from "../constant/status.constant";

/**
 * @description verify user
 * @param req 
 * @param res 
 */
export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const { email, verify_otp } = req.body;

    const user = await verifyUser(email, verify_otp);

    res.status(HttpStatusCode.CREATED).json({ message: user });
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};

/**
 * @description verify owner
 * @param req 
 * @param res 
 */
export const VerifyOwner = async (req: Request, res: Response) => {
  try {
    const { email, verify_otp } = req.body;

    const user = await verifyOwner(email, verify_otp);
    res.status(HttpStatusCode.CREATED).json({ message: user });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

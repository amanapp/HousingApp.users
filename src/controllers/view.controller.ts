import { Response, Request } from "express";
import { userView } from "../services/view.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description view all user 
 * @param req 
 * @param res 
 */
export const UserView = async (req: Request, res: Response) => {
  try {
    const { email, property_id } = req.body;
    const viewUserCount = await userView(email.email, property_id);
    res
      .status(HttpStatusCode.CREATED)
      .json({
        message: ExceptionMessage.VIEW_PROPERTY,
        viewUserCount: viewUserCount,
      });
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};

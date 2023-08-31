import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";
import { getPropertyShow } from "../services/whishlisted_property.services";
import { Response, Request } from "express";

/**
 * @description whisted the property
 * @param req 
 * @param res 
 */
export const GetPropertyShow = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await getPropertyShow(email.email);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.GET_PROPERTY });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

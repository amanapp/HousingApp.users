import { Response, Request } from "express";
import { PropertyPost } from "../services/post.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description created the post of property with details
 * @param req 
 * @param res 
 */
export const propertyPost = async (req: Request, res: Response) => {
  try {
    const { location, price, type, size, status, email } = req.body;
    const user = await PropertyPost(location, price, type, size, status, email.email);
    res.status(HttpStatusCode.CREATED).json({ message: ExceptionMessage.PROPERTY_POST });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

import { Response, Request } from "express";
import { PropertyPost } from "../services/post.services";
import { wishlistProperty } from "../services/wishlist.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";


/**
 * @description  see wishlisted property
 * @param req 
 * @param res 
 */
export const WishlistProperty = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await wishlistProperty(email.email);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.WISHLIST_USER, user });
  } catch (e) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: e.message });
  }
};

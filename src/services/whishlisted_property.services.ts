import axios from "axios";
import { logger } from "../middleware/winsdon.middleware";

// wishlisted the property
/**
 * @description add the property in wishlist
 * @param email
 */
export async function getPropertyShow(email: String,property_id:String): Promise<any> {
  try {
    axios
      .post("http://localhost:3001/user/wishlist", {
        email: email,
        property_id: property_id,
      })
      .then(function (response) {
        logger.log("=====get property=====", response.data);
      })
      .catch(function (error) {
        logger.log(error);
      });
  } catch (e) {
    throw new Error(e.message);
  }
}

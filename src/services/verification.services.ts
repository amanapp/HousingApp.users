import OwnerModel from "../database/models/owner.model";
import UserModel from "../database/models/user.model";
import { client } from "../database/redis";
/**
 * @description Verify user
 * @param email
 * @param verify_otp
 * @returns
 */
export async function verifyUser(
  email: string,
  verify_otp: string
): Promise<any> {
  try {
    let foundUser = await UserModel.findOne({ email: email });
    // check user is exist or not
    if (!foundUser) {
      return {
        message: "User Email not exist, please register the details !! ",
      };
    }
    const val = await client.get(`${email}_verification`);
    // redsi key data iss exist or not
    if (!val) {
      return {
        message: "key not exist , please regenerate verification opt  !! ",
      };
    }

    const filter = { email: email };
    const update = { verification_key: true };
    //check user give opt is exisdt in redis or not
    if (verify_otp == (await client.get(`${email}_verification`))) {
      // user opt is matched so updated the user verificstion key to true value
      await UserModel.updateOne(filter, update);
    }
    return { message: "user verify sucessfully" };
  } catch (e) {
    throw new Error(e.message);
  }
}
/**
 * @description verify owner
 * @param email
 * @param verify_otp
 * @returns
 */
export async function verifyOwner(
  email: string,
  verify_otp: string
): Promise<any> {
  try {
    let foundOwner = await OwnerModel.findOne({ email: email });
    // check owner is exist or not
    if (!foundOwner) {
      return {
        message:
          "Owner/broker Email not exist, please register the details !! ",
      };
    }

    const val = await client.get(`${email}_verification`);
    // redsi key data iss exist or not
    if (!val) {
      return {
        message: "key not exist , please regenerate verification opt  !! ",
      };
    }

    const filter = { email: email };
    const update = { verification_key: true };

    //check owner give opt is exisdt in redis or not
    if (verify_otp == (await client.get(`${email}_verification`))) {
      // user opt is matched so updated the user verificstion key to true value
      await OwnerModel.updateOne(filter, update);
    }
    return { message: "Owner/Broker verify sucessfully" };
  } catch (e) {
    throw new Error(e.message);
  }
}

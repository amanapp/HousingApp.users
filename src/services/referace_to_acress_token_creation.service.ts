import { UUID } from "crypto";
import OwnerModel from "../database/models/owner.model";
import TokenModel from "../database/models/token.model";
import UserModel from "../database/models/user.model";
import { CreationAcessToken } from "../utils/token.function";

/**
 * @description create acess token to the referace token
 * @param email
 * @param jti
 * @returns
 */
export async function referaceToAcessTokenCreation(
  email: String,
  jti: any
): Promise<any> {
  try {
    const findResult =
      (await UserModel.findOne({ email: email })) ||
      (await OwnerModel.findOne({ email: email }));
    const newAcessToken: any = CreationAcessToken(email);

    await TokenModel.insertMany({
      user_id: findResult._id,
      referace_token: jti,
      acess_token: newAcessToken.uuId,
    });
    return newAcessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}

import OwnerModel from "../database/models/owner.model";
import UserModel from "../database/models/user.model";
import bcrypt from "bcrypt";
import { verifyOtpSendUser } from "./verification_otp_send";
import SessionModel from "../database/models/session.model";
import {
  CreationAcessToken,
  CreationReferaceToken,
} from "../utils/token.function";
import TokenModel from "../database/models/token.model";

/**
 * @descriptionadd signup user
 * @param name
 * @param email
 * @param password
 * @param phone_no
 */

export async function signUpUser(
  name: string,
  email: string,
  password: string,
  phone_no: bigint
): Promise<any> {
  try {
    const hashedPassword = await bcrypt.hash(password, 2);
    let foundUser = await UserModel.findOne({ email: email });
    if (foundUser) {
      throw new Error("Alreday exist the user, please login ");
    }

    const users = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone_no: phone_no,
    });
    verifyOtpSendUser({ email });
    await users.save();
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description signup owner
 * @param name
 * @param email
 * @param password
 * @param phone_no
 */
export async function signUpOwner(
  name: string,
  email: string,
  password: string,
  phone_no: bigint
): Promise<any> {
  try {
    const hashedPassword = await bcrypt.hash(password, 2);
    // check user is already register the details
    let foundOwner = await OwnerModel.findOne({ email: email });

    if (foundOwner) {
      throw new Error("Alreday exist the user please login ");
    }

    const owner = OwnerModel.insertMany({
      name: name,
      email: email,
      password: hashedPassword,
      phone_no: phone_no,
    });

    // opt otp sending function is call
    verifyOtpSendUser({ email });
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description login user
 * @param email
 * @param password
 * @returns obiject of acress & referace token
 */
export async function LogInUser(email: string, password: string): Promise<any> {
  try {
    let foundUser = await UserModel.findOne({ email: email });
    if (!foundUser.verification_key == true) {
      verifyOtpSendUser({ email });
      throw new Error(
        "not verifyed user ,please verify , otp is sending sucessfully"
      );
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      throw new Error("Invalid Password");
    }

    const referaceToken: any = await CreationReferaceToken(email);
    const acessToken: any = await CreationAcessToken(email);

    const acessTokenResult = acessToken.acessToken;
    const referaceTokenResult = referaceToken.referaceToken;

    const findUser: any = await UserModel.findOne({ email: email });

    // session store in session collection
    const session = await SessionModel.insertMany({
      user_id: findUser._id,
      device: "chrome",
      status: true,
    });
    // token id store in token collection
    const token = await TokenModel.insertMany({
      user_id: findUser._id,
      referace_token: referaceToken.uuId,
      acess_token: acessToken.uuId,
    });
    return { acessTokenResult, referaceTokenResult };
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description login owner
 * @param email
 * @param password
 * @returns
 */
export async function LogInOwner(
  email: string,
  password: string
): Promise<any> {
  try {
    let foundOwner = await OwnerModel.findOne({ email: email });
    if (!foundOwner.verification_key == true) {
      verifyOtpSendUser({ email });
      throw new Error(
        "not verifyed user ,please verify , otp is sending sucessfully"
      );
    }
    const passwordMatch = await bcrypt.compare(password, foundOwner.password);
    if (!passwordMatch) {
      throw new Error("Invalid Password");
    }
    const referaceToken = await CreationReferaceToken(email);
    const acessToken = await CreationAcessToken(email);
    const acessTokenResult = acessToken.acessToken;
    const referaceTokenResult = referaceToken.referaceToken;

    // session store in session collection
    await SessionModel.insertMany({
      user_id: foundOwner._id,
      device: "chrome",
      status: true,
    });

    // token id store in token collection
    await TokenModel.insertMany({
      user_id: foundOwner._id,
      referace_token: referaceToken.uuId,
      acess_token: acessToken.uuId,
    });
    return { acessTokenResult, referaceTokenResult };
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description logout user
 * @param email
 * @param jti
 */
export async function logoutUser(email: string, jti: String): Promise<any> {
  try {
    
    const findResult =
      (await UserModel.findOne({ email: email }, { _id: 1 })) ||
      (await OwnerModel.findOne({ email: email }, { _id: 1 }));

    // delete entry of specific user
    const findToken = await TokenModel.findOneAndDelete({
      user_id: findResult._id,
      acess_token: jti,
    });
    const sessionUpdate = await SessionModel.updateMany(
      { user_id: findResult._id },
      { status: false }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";


/**
 * @description create acess token & jti
 * @param email
 * @returns
 */
export const CreationAcessToken = (email: String) => {
  try {
    const uuId = uuidv4();
    const payload = { email };
    const access_secret = process.env.ACESSES_kEY;
    const option = { expiresIn: "1h", jwtid: uuId };

    const acessToken = jwt.sign(payload, access_secret, option);

    return { acessToken, uuId };
  } catch (e) {
    return e.message;
  }
};


/**
 * @description Create referace token
 * @param email
 * @returns referace token & jti
 */
export const CreationReferaceToken = (email: String) => {
  try {
    const uuId = uuidv4();

    const payload = { email };
    const referace_secret = process.env.REFERECE_TOKEN_KEY;
    const option = { expiresIn: "2 day", jwtid: uuId };
    const referaceToken = jwt.sign(payload, referace_secret, option);
    return { referaceToken, uuId };
    
  } catch (e) {
    return e.message;
  }
};

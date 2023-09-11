import { client } from "../database/redis";
import { logger } from "../middleware/winsdon.middleware";
import { sendReminderEmail } from "../node-mailer/mail";
/**
 * @description verify otp send
 * @param email
 */
export async function verifyOtpSendUser(email: any): Promise<any> {
  try {
    const EMAIL = email.email;
    let otp: any = Math.floor(1000 + Math.random() * 9000);
    logger.log({level:"info",message:otp})
    await client.set(`${EMAIL}_verification`, JSON.stringify(otp), { EX: 300 });
    let subject = "User varification Otp ";
    let message = `Your otp is sucessfully sending. this is your otp \n ${otp} \nNote:- This otp is valid on the 5 min`;
    await sendReminderEmail(EMAIL, subject, message);
  } catch (e) {
    throw new Error(e.message);
  }
}

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "../middleware/winsdon.middleware";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
  debug: true,
});
/**
 * @description customized messages send
 * @param to
 * @param subject
 * @param text
 */
export const sendReminderEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.APP_MAIL,
      to,
      subject,
      text,
    });

    logger.log({level:"info",message:"Email sent successfully."});
  } catch (error) {
    logger.error({level:"error",message:"Error sending email:"});
  }
};

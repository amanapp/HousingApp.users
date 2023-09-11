import { Response, Request } from "express";
import { addSubscriptionPlan } from "../services/add_subscription.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description  add subcription plan in subcription db
 * @param req 
 * @param res 
 */
export const AddSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const { amount, email } = req.body;
    const result = await addSubscriptionPlan(amount, email.email);
    res.status(HttpStatusCode.CREATED).json({ message:ExceptionMessage.SUBSCRIPTION_ADD });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

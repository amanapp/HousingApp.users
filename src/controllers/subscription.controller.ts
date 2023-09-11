import { Response, Request } from "express";
import {
  revokeSubscription,
  showSubscription,
  subscriptionPlan,
} from "../services/subscription.services";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

/**
 * @description add subscription plan
 * @param req 
 * @param res 
 */
export const SubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const { amount, name, offers } = req.body;
    const result = await subscriptionPlan(amount, name, offers);

    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.SUBSCRIPTION_ADD });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

/**
 * @description show subscription plan
 * @param req 
 * @param res 
 */
export const ShowSubscription = async (req: Request, res: Response) => {
  try {
    const Result = await showSubscription();
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: ExceptionMessage.SUBCRIPTION, subscription: Result });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

/**
 * @description revoke subscription
 * @param req 
 * @param res 
 */
export const RevokeSubscription = async (req: Request, res: Response) => {
  try {
    const { amount, email } = req.body;
    const Result = await revokeSubscription(amount, email.email);
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: ExceptionMessage.SUBCRIPTION, subscription: Result });
  } catch (e) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: e.message });
  }
};

import SubModel from "../database/models/subscription.model";
import UserModel from "../database/models/user.model";
import { addSubscriptionPlan } from "./add_subscription.services";

/**
 * make the subscription model
 * @param amount
 * @param name
 * @param offers
 */
export async function subscriptionPlan(
  amount: Number,
  name: String,
  offers: string
): Promise<any> {
  try {
    const subscription = new SubModel({
      amount: amount,
      name: name,
      offers: offers,
    });
    await subscription.save();
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description show the subscription model
 * @returns result
 */
export async function showSubscription(): Promise<any> {
  try {
    const result = SubModel.find({});
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * @description revoke subscription plan
 * @param amount
 * @param email
 * @returns
 */
export async function revokeSubscription(
  amount: Number,
  email: String
): Promise<any> {
  try {
    const findUser: any = await UserModel.findOne({ email });
    const currentdate: any = new Date();
    if (findUser.subscription_end > currentdate) {
      return { "message ::": "subscription already valid " };
    }
    await addSubscriptionPlan(amount, email);
  } catch (e) {
    throw new Error(e.message);
  }
}

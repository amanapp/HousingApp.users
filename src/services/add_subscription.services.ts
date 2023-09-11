import SubModel from "../database/models/subscription.model";
import UserModel from "../database/models/user.model";

/**
 * @author Aman Dixit
 * @description purchase subscription for user
 * @param amount
 * @param email
 *
 */
export async function addSubscriptionPlan(
  amount: Number,
  email: String
): Promise<any> {
  try {
    const findSub = await SubModel.findOne({ amount });
    const findUser = await UserModel.findOne({ email });
   
    const subresult: any = findUser.subscription_id;
    const SubscriptionStartDate = new Date();
    const SubscriptionEndDate = new Date(
      new Date().setDate(SubscriptionStartDate.getDate() + 30)
    );
    if (subresult) {
      throw new Error("allready subscription avilable");
    }

    UserModel.updateOne(
      { email: email },
      {
        subscription_id: findSub._id,
        subscription_start: SubscriptionStartDate,
        subscription_end: SubscriptionEndDate,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

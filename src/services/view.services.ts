import UserModel from "../database/models/user.model";

/**
 *
 * @param email
 * @param property_id
 * @returns
 */
export async function userView(
  email: string,
  property_id: Object
): Promise<any> {
  try {
    let foundUser: any = await UserModel.findOne({ email: email });
    const currentdate: any = new Date();
    const currentDate = parseInt(currentdate);

    if (foundUser.visit_count.length + 1 >= 10) {
      if (
        (currentDate > foundUser.subscription_start &&
          currentDate < foundUser.subscription_end) ||
        foundUser.subscription_end == null
      ) {
        return { status: "error", message: "please purchase subscription" };
      }
    }
    await UserModel.updateOne(
      { _id: foundUser._id },
      { $push: { visit_count: property_id } }
    );
    return (await foundUser.visit_count.length) + 1;
  } catch (e) {
    throw new Error(e.message);
  }
}

import UserModel from "../database/models/user.model";

/**
 * @description show wishlist user
 * @param email
 * @returns
 */
export async function wishlistProperty(email: string): Promise<any> {
  try {
    let foundUser: any = await UserModel.findOne({ email: email });
    if (!foundUser) {
      return { status: "error", message: "No user with this email" };
    }
    return foundUser.wishlist_id;
  } catch (e) {
    throw new Error(e.message);
  }
}

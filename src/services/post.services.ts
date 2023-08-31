import OwnerModel from "../database/models/owner.model";
import amqp from "amqplib/callback_api";

/**
 * @description created the post of property by using the owner
 * @param location
 * @param price
 * @param type
 * @param size
 * @param status
 * @param email
 */
export async function PropertyPost(
  location: String,
  price: String,
  type: String,
  size: String,
  status: String,
  email: String
): Promise<any> {
  try {
    let foundOwner = await OwnerModel.findOne({ email: email });
    let value_pass = {
      owner_id: foundOwner._id,
      location: location,
      price: price,
      type: type,
      size: size,
      status: status,
    };
    // rebbit mq to send the buffer (producer)
    amqp.connect("amqp://localhost", function (err, conn) {
      conn.createChannel(function (err, ch) {
        const queue = "message_queue_user";
        const msg = JSON.stringify(value_pass);
        ch.assertQueue(queue, { durable: false });
        ch.sendToQueue(queue, Buffer.from(msg));
      });
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

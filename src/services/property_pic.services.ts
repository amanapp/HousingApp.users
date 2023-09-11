import OwnerModel from "../database/models/owner.model";
import amqp from "amqplib/callback_api";
/**
 * @description add the property pic
 * @param buffer
 * @param email
 */
export async function propertyPicAdd(
  buffer: Buffer,
  email: String
): Promise<any> {
  try {
    let foundOwner = await OwnerModel.findOne({ email: email });
    let value_pass = {
      owner_id: foundOwner._id,
      buffer: buffer,
    };
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

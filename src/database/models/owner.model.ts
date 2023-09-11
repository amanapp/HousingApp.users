import mongoose, { Document, Schema } from "mongoose";
interface Owner extends Document {
  name: string;
  email: string;
  password: string;
  phone_no: number;
  verification_key:Boolean;
 
}

const ownerSchema: Schema<Owner> = new Schema<Owner>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true },
  verification_key: { type: Boolean, required: false },
 
},{timestamps:true});

const OwnerModel = mongoose.model<Owner>("Owner", ownerSchema);

export default OwnerModel;

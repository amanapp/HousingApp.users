import mongoose, { Document, Schema } from "mongoose";
interface Sub extends Document {
  amount: Number;
  name: string;
  offers: string;
 
}

const subSchema: Schema<Sub> = new Schema<Sub>({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  offers: { type: String, required: true },
 
},{timestamps:true});

const SubModel = mongoose.model<Sub>("Subscription", subSchema);

export default SubModel;

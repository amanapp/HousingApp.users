import mongoose, { Document, Schema } from "mongoose";
interface Session extends Document {
  user_id: mongoose.Types.ObjectId;
  device: string;
  status: boolean; 
 
}

const sessionSchema: Schema<Session> = new Schema<Session>({
  user_id: {
     type:mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  device: { type: String,  required: false },
  status: { type: Boolean, required: false },
 
},{timestamps:true});

const SessionModel = mongoose.model<Session>("Session", sessionSchema);

export default SessionModel;

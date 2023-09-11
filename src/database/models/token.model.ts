import mongoose, { Document, Schema } from "mongoose";
interface Token extends Document {
  user_id: mongoose.Types.ObjectId;
  referace_token: Schema.Types.UUID;
  acess_token: Schema.Types.UUID;
}

const tokenSchema: Schema<Token> = new Schema<Token>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  referace_token: { type: Schema.Types.UUID, required: true },
  acess_token: { type:Schema.Types.UUID, required: true },
  
},{timestamps:true});

const TokenModel = mongoose.model<Token>("Token", tokenSchema);

export default TokenModel;





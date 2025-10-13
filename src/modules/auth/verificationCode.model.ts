import { Document, model, Schema } from "mongoose";

export interface IVerifyCode extends Document {
  email: string;
  verificationCode: number;
  createdAt?: Date;
}

const verificationSchema = new Schema<IVerifyCode>({
  email: { type: String, required: true },
  verificationCode: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 15 * 60,
  },
});

export const VerifyCode = model("VerifyCode", verificationSchema);

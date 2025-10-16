import { Document, model, Schema } from "mongoose";
const verificationSchema = new Schema({
    email: { type: String, required: true },
    verificationCode: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 15 * 60,
    },
});
export const VerifyCode = model("VerifyCode", verificationSchema);
//# sourceMappingURL=verificationCode.model.js.map
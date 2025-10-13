import { model, Schema } from "mongoose";
import type { ICoupon } from "./coupon.interface.js";

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
    discount: { type: Number, required: true },
    discountType: {
      type: String,
      enum: ["percentage", "amount"],
      default: "percentage",
    },
    minSpend: Number,
    maxDiscount: Number,
    expiresIn: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
export const Coupon = model("Coupon", couponSchema);

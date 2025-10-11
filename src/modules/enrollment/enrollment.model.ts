import { model, Schema } from "mongoose";
import type { IEnrollment } from "./enrollment.interface.js";

const enrollmentSchema = new Schema<IEnrollment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },
  discounted: { type: Number, default: 0 },
  discountType: {
    type: String,
    enum: ["parcentage", "amount"],
    default: "parcentage",
  },
  status: {
    type: String,
    enum: ["paid", "pending", "cancelled"],
    default: "pending",
  },
  transactionId: String,
  phone: {
    type: String,
    required: true,
  },
});

export const Enrollment = model("Enrollment", enrollmentSchema);

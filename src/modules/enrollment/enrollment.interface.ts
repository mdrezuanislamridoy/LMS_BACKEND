import type { Document, Types } from "mongoose";

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  courseId: Types.ObjectId;
  totalAmount: number;
  discounted: number;
  discountType: "parcentage" | "amount";
  status: "paid" | "pending" | "cancelled";
  transactionId: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

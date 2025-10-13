import type { Document, Types } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  courses: Types.ObjectId[];
  discount: number;
  discountType: "percentage" | "amount";
  expiresIn: Date;
  isActive: boolean;
  minSpend?: number;
  maxDiscount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

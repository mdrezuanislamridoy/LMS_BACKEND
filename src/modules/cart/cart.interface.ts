import type { Document, Types } from "mongoose";

interface item {
  product: Types.ObjectId;
  qty: number;
  price: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: item[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

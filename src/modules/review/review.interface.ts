import type { Document, Types } from "mongoose";

export interface IReview extends Document {
  reviewer: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

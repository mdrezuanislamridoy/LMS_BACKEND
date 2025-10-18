import type { Document, Types } from "mongoose";

export interface IReview extends Document {
  reviewer: Types.ObjectId;
  course: Types.ObjectId;
  rating: number;
  comment: string;
  images: [
    {
      imageurl: String;
      publicId: String;
    }
  ];
  createdAt?: Date;
  updatedAt?: Date;
}

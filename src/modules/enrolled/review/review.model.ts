import { model, Schema } from "mongoose";
import type { IReview } from "./review.interface.js";

const reviewModel = new Schema<IReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
      {
        imageurl: String,
        publicId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

reviewModel.index({ course: 1 });
reviewModel.index({ reviewer: 1 });
reviewModel.index({ createdAt: -1 });
reviewModel.index({ reviewer: 1, course: 1 }, { unique: true });

export const Review = model("Review", reviewModel);

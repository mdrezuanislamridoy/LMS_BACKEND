import { model, Schema } from "mongoose";
import type { IReview } from "./review.interface.js";

const reviewModel = new Schema<IReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
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
  },
  {
    timestamps: true,
  }
);

export const Review = model("Review", reviewModel);

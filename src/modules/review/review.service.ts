import type { NextFunction } from "express";

import createHttpError from "http-errors";
import type { IReview } from "./review.interface.js";
import { Review } from "./review.model.js";

const SAddReview = async (
  reviewer: string,
  product: string,
  payload: IReview
) => {
  return await Review.create({ ...payload, reviewer, product });
};

export const SGetReviews = async (id: string) => {
  return await Review.find({ product: id });
};

export const SDeleteReview = async (
  userId: string | undefined,
  id: string,
  next: NextFunction
) => {
  const review = await Review.findById(id);

  if (review && review.reviewer?.toString() !== userId) {
    return next(
      createHttpError(401, "You're not allowed to delete this review")
    );
  }
  return await Review.findByIdAndDelete(id);
};

export const RService = {
  SAddReview,
  SGetReviews,
  SDeleteReview,
};

import type { NextFunction, Request } from "express";

import createHttpError from "http-errors";
import type { IReview } from "./review.interface.js";
import { Review } from "./review.model.js";

const SAddReview = async (req: Request) => {
  const userId = req.user._id;
  const courseId = req.params.courseId;
  const data = req.body;
  return await Review.create({ ...data, reviewer: userId, course: courseId });
};

export const SGetReviews = async (id: string) => {
  return await Review.find({ course: id });
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

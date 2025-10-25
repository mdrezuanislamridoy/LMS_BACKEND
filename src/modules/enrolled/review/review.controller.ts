import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { RService } from "./review.service.js";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await RService.SAddReview(req);

    if (!review) {
      return next(createHttpError(400, "Review addition failed"));
    }

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return next(createHttpError(400, "Course ID is required"));
    }

    const reviews = await RService.SGetReviews(courseId);
    if (!reviews || reviews.length === 0) {
      return next(createHttpError(404, "No reviews found"));
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const reviewId = req.params.id;

    if (!userId) {
      return next(createHttpError(401, "Unauthorized"));
    }

    if (!reviewId) {
      return next(createHttpError(400, "Review ID is required"));
    }

    const deleted = await RService.SDeleteReview(
      userId.toString(),
      reviewId,
      next
    );

    if (!deleted) {
      return next(createHttpError(400, "Review deletion failed"));
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

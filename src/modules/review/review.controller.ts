import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import { RService } from "./review.service.js";
import type { IReview } from "./review.interface.js";

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await RService.SAddReview(
      req.userId as string,
      req.params.productId as string,
      req.body as IReview
    );

    if (!review) {
      next(createHttpError(400, "Review addition failed"));
    }
    res.status(201).json({ message: "Review added successfully", review });
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
    const reviews = await RService.SGetReviews(req.params.productId as string);
    if (!reviews) {
      return next(createHttpError(404, "No Review Found"));
    }
    res.status(200).json({ message: "Review fetched successfully", reviews });
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
    const reviews = await RService.SDeleteReview(
      req.userId as string,
      req.params.id as string,
      next as NextFunction
    );
    if (!reviews) {
      return next(createHttpError(400, "review deletion failed"));
    }
    res.status(200).json({ message: "Review deleted successfully", reviews });
  } catch (error) {
    next(error);
  }
};

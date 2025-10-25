import type { NextFunction, Request, Response } from "express";
import { SEnrollment } from "./enrollment.service.js";
import createHttpError from "http-errors";

export const Enroll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SEnrollment.SEnroll(req as Request);

    if (!result) {
      return next(createHttpError(400, "Order Creation Failed"));
    }

    return res.status(201).json({
      message:
        result.message ||
        "Enrollment requested submitted. Please pay for confirmation",
      enrollment: result.enrollment,
      redirectUrl: `/payment/payBill/${result.enrollment._id}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SEnrollment.SGetMyEnrollments(req as Request);
    if (!result) {
      return next(createHttpError(404, "No enrollment found"));
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEnrollmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedOrder = await SEnrollment.SUpdateEnrollmentStatus(
      req as Request
    );
    if (!updatedOrder) {
      return next(createHttpError(400, "Order Updation failed"));
    }
    res
      .status(200)
      .json({ message: "Order Updated Successfully", updatedOrder });
  } catch (error) {
    next(error);
  }
};

export const updateVideoProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SEnrollment.SUpdateVideoProgress(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

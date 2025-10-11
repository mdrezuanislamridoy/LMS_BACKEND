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

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myOrders = await SEnrollment.SGetMyEnrollments(req as Request);
    if (!myOrders) {
      return next(createHttpError(404, "No order found"));
    }
    res.status(200).json({ message: "Order fetched successfully", myOrders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedOrder = await SEnrollment.SUpdateEnrollmentStatus(
      req as Request,
      req.body.status,
      next as NextFunction
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

import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { SPayment } from "./payment.service.js";
import { Enrollment } from "../enrollment/enrollment.model.js";

export const payBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bill = await SPayment.SPayBill(req);
    if (!bill) {
      return next(createHttpError(400, "Payment initiation failed"));
    }
    res.status(200).json(bill);
  } catch (error) {
    next(error);
  }
};

export const success = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { status: "paid", paymentStatus: "paid" },
      { new: true }
    );
    if (!enrollment) {
      return next(createHttpError(404, "Enrollment not found"));
    }
    res
      .status(200)
      .json({ message: "Enrollment completed successfully", enrollment });
  } catch (error) {
    next(error);
  }
};

export const failed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { status: "pending", paymentStatus: "failed" },
      { new: true }
    );
    if (!enrollment) {
      return next(createHttpError(404, "Enrollment not found"));
    }
    res.status(200).json({ message: "Payment failed", enrollment });
  } catch (error) {
    next(error);
  }
};

export const canceled = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { status: "pending", paymentStatus: "unpaid" },
      { new: true }
    );
    if (!enrollment) {
      return next(createHttpError(404, "Enrollment not found"));
    }
    res.status(200).json({ message: "Payment canceled", enrollment });
  } catch (error) {
    next(error);
  }
};

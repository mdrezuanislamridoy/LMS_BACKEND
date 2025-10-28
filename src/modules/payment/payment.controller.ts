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
    const enrollment = await SPayment.SSuccess(req as Request);

    return res.status(200).json(enrollment);
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
    const enrollment = await SPayment.SFail(req as Request);

    return res.status(200).json(enrollment);
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
    const enrollment = await SPayment.SCancel(req as Request);

    return res.status(200).json(enrollment);
  } catch (error) {
    next(error);
  }
};

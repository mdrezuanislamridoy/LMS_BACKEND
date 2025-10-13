import type { NextFunction, Request, Response } from "express";
import { SCoupon } from "./coupon.service.js";

export const addCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SCoupon.SCreateCoupon(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SCoupon.SUpdateCoupon(req as Request);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SCoupon.SDeleteCoupon(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

import type { NextFunction, Request, Response } from "express";
import { SCoupon } from "./coupon.service.js";
import { Coupon } from "./coupon.model.js";


export const getCoupon = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const coupons = await Coupon.find()

    res.status(200).json({
      success:true,
      message:"Coupon fetched successfully",
      coupons
    })
  } catch (error) {
    next(error)
  }
}
export const addCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SCoupon.SCreateCoupon(req);
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
    const result = await SCoupon.SUpdateCoupon(req);
    res.status(200).json(result);
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
    const result = await SCoupon.SDeleteCoupon(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

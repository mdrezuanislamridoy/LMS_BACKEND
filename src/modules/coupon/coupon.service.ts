import type { Request } from "express";
import { Coupon } from "./coupon.model.js";
import createHttpError from "http-errors";

const SCreateCoupon = async (req: Request) => {
  const coupon = await Coupon.create(req.body);
  if (!coupon) {
    throw createHttpError(400, "Coupon code creation failed");
  }

  return {
    success: true,
    message: "Coupon created successfully",
    coupon,
  };
};

const SUpdateCoupon = async (req: Request) => {
  const couponId = req.params.id;
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    throw createHttpError(404, "Coupon not found");
  }

  const result = await Coupon.findByIdAndUpdate(couponId);

  if (!result) {
    throw createHttpError(400, "Coupon updation failed");
  }
  return {
    success: true,
    message: "Coupon updated successfully",
    coupon: result,
  };
};

const SDeleteCoupon = async (req: Request) => {
  const result = await Coupon.findByIdAndDelete(req.params.id as string);
  if (!result) {
    throw createHttpError(400, "Coupon deletion failed");
  }
  return {
    success: true,
    message: "Coupon deleted successfully",
  };
};

export const SCoupon = {
  SCreateCoupon,
  SUpdateCoupon,
  SDeleteCoupon,
};

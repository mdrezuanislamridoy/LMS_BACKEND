import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../auth/user.model.js";
import { CourseModel } from "../course/models/course.model.js";
import { Enrollment } from "./enrollment.model.js";
import { Coupon } from "../coupon/coupon.model.js";
import type { ICoupon } from "../coupon/coupon.interface.js";
const SEnroll = async (req: Request) => {
  const userId = req.userId;
  const courseId = req.params.id;

  const user = await UserModel.findById(userId);
  if (user?.role !== "student") {
    throw createHttpError(403, "You cannot enroll course");
  }

  const course = await CourseModel.findById(courseId).populate("couponCodes");
  if (!course) {
    throw createHttpError(404, "Course not found");
  }

  const { couponCode } = req.body;

  let discount = 0;
  let discountType = "percentage";

  let totalAmount = course.price;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.code });
    if (!coupon) throw createHttpError(400, "Invalid coupon");

    if (!coupon.isActive || new Date(coupon.expiresIn) < new Date()) {
      throw createHttpError(400, "Coupon expired or inactive");
    }

    if (coupon.minSpend && course.price < coupon.minSpend) {
      throw createHttpError(
        400,
        `Minimum spend for this coupon is ${coupon.minSpend}`
      );
    }

    discountType = coupon.discountType;

    if (coupon.courses.some((id) => id.toString() === courseId)) {
      throw createHttpError(400, "Coupon not valid for this course");
    }

    if (discountType === "percentage") {
      discount = course.price * (coupon.discount / 100);
    } else {
      discount = coupon.discount;
    }

    totalAmount -= discount;
  }

  const enrollment = await Enrollment.create({
    ...req.body,

    user: userId,
    courseId,
    discounted: discount,
    discountType,
    totalAmount,
    status: "pending",
  });
  if (!enrollment) {
    throw createHttpError(400, "Failed to enroll course");
  }
  return {
    success: true,
    message: "Enrollment pending, kindly pay for confirmation",
    enrollment,
  };
};

const SGetMyEnrollments = async (req: Request) => {
  return await Enrollment.find({ user: req.userId });
};

const SUpdateEnrollmentStatus = async (
  req: Request,
  status: string,
  next: NextFunction
) => {
  return await Enrollment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
};

export const SEnrollment = {
  SEnroll,
  SGetMyEnrollments,
  SUpdateEnrollmentStatus,
};

import type { Request } from "express";
import createHttpError from "http-errors";
import { Enrollment } from "./enrollment.model.js";
import { Coupon } from "../coupon/coupon.model.js";
import { UserModel } from "../auth/user/user.model.js";
import { CourseModel } from "../course/course.model.js";

const SEnroll = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const courseId = req.params.id;

  const user = await UserModel.findById(userId);
  if (!user || user.role !== "student") {
    throw createHttpError(403, "You cannot enroll in this course");
  }

  const course = await CourseModel.findById(courseId)
    .populate<{ couponCodes: any[] }>("couponCodes")
    .exec();

  if (!course) throw createHttpError(404, "Course not found");

  let discount = 0;
  let discountType: "percentage" | "amount" = "percentage";
  let totalAmount = course.price;

  const { couponCode = "" } = req.body;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.code });
    if (!coupon) throw createHttpError(400, "Invalid coupon");
    if (!coupon.isActive || new Date(coupon.expiresIn) < new Date())
      throw createHttpError(400, "Coupon expired or inactive");
    if (coupon.minSpend && course.price < coupon.minSpend)
      throw createHttpError(
        400,
        `Minimum spend for this coupon is ${coupon.minSpend}`
      );

    discountType = coupon.discountType;
    if (!coupon.courses.some((id) => id.toString() === courseId))
      throw createHttpError(400, "Coupon not valid for this course");

    discount =
      discountType === "percentage"
        ? course.price * (coupon.discount / 100)
        : coupon.discount;

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

  if (!enrollment) throw createHttpError(400, "Failed to enroll in course");

  return {
    success: true,
    message: "Enrollment pending, please complete payment for confirmation",
    enrollment,
  };
};

const SGetMyEnrollments = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const enrollments = await Enrollment.find({ user: userId })
    .populate("courseId")
    .populate("progress.finishedVideos")
    .populate("progress.finishedModules");

  const total = await Enrollment.countDocuments({ user: userId });
  const completed = await Enrollment.countDocuments({
    user: userId,
    isCompleted: true,
  });

  return {
    success: true,
    message: "Enrollments fetched successfully",
    enrollments,
    total,
    completed,
  };
};

const SUpdateEnrollmentStatus = async (req: Request) => {
  const status = req.body.status;
  if (!["paid", "pending", "cancelled"].includes(status)) {
    throw createHttpError(400, "Invalid status value");
  }

  const updated = await Enrollment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!updated) throw createHttpError(404, "Enrollment not found");

  return updated;
};

const SUpdateVideoProgress = async (req: Request) => {
  const { videoId } = req.body;
  const courseId = req.params.id;
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const enrollment = await Enrollment.findOne({ user: userId, courseId });
  if (!enrollment) throw createHttpError(404, "Enrollment not found");

  if (!enrollment.progress.finishedVideos.includes(videoId)) {
    enrollment.progress.finishedVideos.push(videoId);
  }

  enrollment.progress.lastAccessedVideo = videoId;
  enrollment.progress.percentage =
    enrollment.progress.totalVideos === 0
      ? 0
      : (enrollment.progress.finishedVideos.length /
          enrollment.progress.totalVideos) *
        100;

  await enrollment.save();

  return {
    success: true,
    message: "Progress updated successfully",
    progress: enrollment.progress,
  };
};

export const SEnrollment = {
  SEnroll,
  SGetMyEnrollments,
  SUpdateEnrollmentStatus,
  SUpdateVideoProgress,
};

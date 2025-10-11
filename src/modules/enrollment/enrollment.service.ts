import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../user/user.model.js";
import { CourseModel } from "../course/models/course.model.js";
import { Enrollment } from "./enrollment.model.js";
const SEnroll = async (req: Request) => {
  const userId = req.userId;
  const courseId = req.params.id;

  const user = await UserModel.findById(userId);
  if (user?.role !== "student") {
    throw createHttpError(403, "You cannot enroll course");
  }

  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw createHttpError(404, "Course not found");
  }

  const enrollment = await Enrollment.create({
    ...req.body,
    user: userId,
    courseId,
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

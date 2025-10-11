import type { NextFunction, Request, Response } from "express";
import { UserModel } from "../user.model.js";
import createHttpError from "http-errors";
import { SStudent } from "./student.service.js";

export const sendVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SStudent.USendCode(req.body.email as string);

    res
      .status(200)
      .json({ success: true, message: "A 6 digit code sent to your account" });
  } catch (error) {
    next(error);
  }
};

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await SStudent.UVerifyCode(req as Request);
    if (!resp) {
      return next(createHttpError(400, "Code didn't matched, Try again"));
    }
    res
      .status(200)
      .json({ success: true, message: "Code verified successfully" });
  } catch (error) {
    next(error);
  }
};
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStudent = await SStudent.SCreateStudent(req.body, next);
    if (!newStudent) {
      return next(createHttpError(400, "Failed To Create Student"));
    }
    res.status(201).json({
      message: "Student Account Creation Request Successful. Go To Login Page",
    });
  } catch (error) {
    next(error);
  }
};

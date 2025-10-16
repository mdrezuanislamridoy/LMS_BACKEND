import type { Request } from "express";
import type { IStudent } from "./student.interface.js";
import { Student } from "./student.model.js";
import { VerifyCode } from "../verificationCode.model.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

const SCreateStudent = async (req: Request) => {
  const data: IStudent = req.body;
  const isVerified = await VerifyCode.findOne({
    email: req.body.email,
    verificationCode: req.body.verificationCode,
  });

  if (!isVerified?.verified) {
    throw createHttpError(400, "You're not verified");
  }
  await VerifyCode.deleteMany({ email: req.body.email });

  const role = "student";

  const password = await bcrypt.hash(req.body.password, 10);
  const student = await Student.create({ ...data, role, password });

  if (!student) {
    throw createHttpError(400, "Student creation failed");
  }

  return {
    success: true,
    message: "Student account created successfully",
    student,
  };
};

const SUpdateStudent = async (req: Request) => {
  const userId = req.user.id as string;
  const student = await Student.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!student) {
    throw createHttpError(400, "Student updation failed");
  }
  return {
    student,
    success: true,
    message: "Student updated successfull",
  };
};

export const SStudent = {
  SCreateStudent,
  SUpdateStudent,
};

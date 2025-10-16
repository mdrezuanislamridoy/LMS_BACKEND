import createHttpError from "http-errors";

import bcrypt from "bcrypt";
import type { NextFunction, Request } from "express";
import { UserModel } from "../user/user.model.js";
import { VerifyCode } from "../verificationCode.model.js";

const SCreateMentor = async (req: Request) => {
  const isVerified = await VerifyCode.findOne({
    email: req.body.email,
    verificationCode: req.body.verificationCode,
  });

  if (!isVerified?.verified) {
    throw createHttpError(400, "You're not verified");
  }
  await VerifyCode.deleteMany({ email: req.body.email });

  const mentor = await UserModel.findOne({ email: req.body.email });
  if (mentor) {
    throw createHttpError(400, "Account Already Exists");
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);

  return await UserModel.create({
    ...req.body,
    password: hashedPass,
    role: "mentor",
    mentorStatus: "pending",
  });
};

export const mentorService = {
  SCreateMentor,
};

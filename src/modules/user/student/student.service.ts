import type { Request } from "express";
import { Student } from "./student.model.js";
import { VerifyCode } from "../verificationCode.model.js";
import User from "../user.model.js";
import type { IStudent } from "./student.interface.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/sendMail.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const USendCode = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, "User already exist");
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const result = await VerifyCode.create({ email, verificationCode });
  if (!result) {
    throw createHttpError(400, "Failed to create verification code");
  }
  await sendMail(
    email,
    "Your RR-Commerce verification code",
    `${verificationCode}`
  );

  return result;
};

const UVerifyCode = async (req: Request) => {
  return await VerifyCode.findOne({
    email: req.body.email,
    verificationCode: req.body.verificationCode,
  });
};

const SCreateStudent = async (payload: IStudent) => {
  const hashedPass = await bcrypt.hash(payload.password, 10);

  const user = new User({ ...payload, password: hashedPass });

  await VerifyCode.deleteMany({ email: user.email });

  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;

  await user.save();

  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};
export const SStudent = {
  USendCode,
  UVerifyCode,
  SCreateStudent,
};

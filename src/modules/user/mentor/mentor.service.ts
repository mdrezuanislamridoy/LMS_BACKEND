import createHttpError from "http-errors";
import type { IBaseUser } from "../baseUser.interface.js";
import { UserModel } from "../user.model.js";
import bcrypt from "bcrypt";
import type { NextFunction, Request } from "express";

const SCreateMentor = async (payload: IBaseUser, next: NextFunction) => {
  const mentor = await UserModel.findOne({ email: payload.email });
  if (mentor) {
    return next(createHttpError(400, "User Already Exists"));
  }

  const hashedPass = await bcrypt.hash(payload.password, 10);

  return await UserModel.create({
    ...payload,
    password: hashedPass,
    status: "pending",
  });
};

const MBlock = async (id: string, next: NextFunction) => {
  const user = await User.findById(id);
  if (!user || user.role !== "user") {
    return next(createHttpError(400, "You're not allowed to block this user "));
  }

  user.isBlocked = true;

  await user.save();

  await sendMail(
    user.email,
    "You're account has been blocked by admin",
    `
        
    `
  );
};

export const mentorService = {
  SCreateMentor,
  MBlock,
};

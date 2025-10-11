import createHttpError from "http-errors";
import type { IBaseUser } from "../baseUser.interface.js";
import { UserModel } from "../user.model.js";
import bcrypt from "bcrypt";
import type { NextFunction, Request } from "express";

const SCreateAdmin = async (payload: IBaseUser, next: NextFunction) => {
  const mentor = await UserModel.findOne({ email: payload.email });
  if (mentor) {
    return next(createHttpError(400, "User Already Exists"));
  }

  const hashedPass = await bcrypt.hash(payload.password, 10);

  return await UserModel.create({
    ...payload,
    password: hashedPass,
    status: "active",
  });
};

export const adminService = {
  SCreateAdmin,
};

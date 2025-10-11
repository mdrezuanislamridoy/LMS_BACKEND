import createHttpError from "http-errors";
import { UserModel } from "./user.model.js";
import bcrypt from "bcrypt";
import type { NextFunction } from "express";

const Login = async (email: string, password: string, next: NextFunction) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(createHttpError(404, "User Not Found"));
  }

  if (
    (user.role === "admin" || user.role === "mentor") &&
    user.status !== "active"
  ) {
    return next(createHttpError(401, "You're not allowd to login"));
  }

  const isPassValid = await bcrypt.compare(user.password, password);
  if (!isPassValid) {
    return next(createHttpError(400, "Invalid Password"));
  }

  const userData = user.toObject() as { [key: string]: any };
  delete userData.password;

  return userData;
};

export const userService = {
  Login,
};

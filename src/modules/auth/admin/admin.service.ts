import type { NextFunction } from "express";

import createHttpError from "http-errors";
import { sendMail } from "../../../utils/sendMail.js";
import bcrypt from "bcrypt";
import { UserModel } from "../user/user.model.js";
import type { IUser } from "../user/user.interface.js";
import { Admin } from "./admin.model.js";

const ACreate = async (payload: IUser) => {
  const hashedPass = await bcrypt.hash(payload.password, 10);

  const user = await UserModel.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(400, "Account already exist");
  }

  return await Admin.create({
    ...payload,
    password: hashedPass,
    role: "admin",
  });
};

const ABlock = async (id: string, next: NextFunction) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw createHttpError(400, "user didn't matched ");
  }

  user.isBlocked = true;

  await user.save();

  await sendMail(
    user.email,
    "Your account has been blocked by admin",
    `
        
    `
  );

  return user;
};

const AUnBlock = async (id: string, next: NextFunction) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw createHttpError(400, "user didn't matched ");
  }

  user.isBlocked = false;

  await user.save();

  await sendMail(
    user.email,
    "Your account has been unblocked by admin",
    `
        
    `
  );

  return user;
};

const ADelete = async (id: string, next: NextFunction) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw createHttpError(400, "user didn't matched ");
  }

  user.isDeleted = true;

  await user.save();
  await sendMail(
    user.email,
    "Your account has been deleted by admin",
    `
        
    `
  );

  return user;
};

const AUndoDelete = async (id: string, next: NextFunction) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw createHttpError(400, "user didn't matched ");
  }

  user.isDeleted = false;

  await user.save();

  await sendMail(
    user.email,
    "Your account is now reusable",
    `
        
    `
  );

  return user;
};

export const AService = {
  ACreate,
  ABlock,
  AUnBlock,
  ADelete,
  AUndoDelete,
};

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { UserModel } from "../modules/user/user.model.js";
import type { IBaseUser } from "../modules/user/baseUser.interface.js";
dotenv.config();

export const User = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return next(createHttpError(400, "Not able to fetch data"));
    }

    let user: IBaseUser | null = await UserModel.findById(decoded.id);

    if (!user) {
      return next(createHttpError(404, "User Not Found"));
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};

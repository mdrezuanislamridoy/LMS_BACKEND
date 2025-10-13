import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { UserModel } from "../modules/auth/user.model.js";
import type { IBaseUser } from "../modules/auth/user.interface.js";
dotenv.config();

export const Mentor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.token;
    let refreshToken = req.cookies.refreshToken;

    if (!token) {
      if (!refreshToken) {
        return next(createHttpError(401, "Unauthorized"));
      }
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      );

      const newAccessToken = jwt.sign(
        { id: refreshDecoded.id, email: refreshDecoded.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });
      token = newAccessToken;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return next(createHttpError(400, "Not able to fetch data"));
    }

    let user: IBaseUser | null = await UserModel.findById(decoded.id);

    if (!user) {
      return next(createHttpError(404, "User Not Found"));
    }

    if (user.role !== "mentor" && user.status !== "active") {
      return next(createHttpError(401, "You're not allowed to do this "));
    }

    req.mentorId = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};

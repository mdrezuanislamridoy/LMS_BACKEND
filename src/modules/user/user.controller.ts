import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const student = await userService.Login(email, password, next);
    if (!student) {
      return next(createHttpError(400, "Failed To Create Student"));
    }

    const token = jwt.sign(
      { id: student._id, email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message:
          "Student Account Creation Request Successful. Go To Login Page",
        token,
        student,
      });
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.userId);

    const userData = user?.toObject();
    delete userData?.password;

    return res.status(200).json({ user: userData });
  } catch (error) {
    next(error);
  }
};

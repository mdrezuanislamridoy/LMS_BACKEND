import type { NextFunction, Request, Response } from "express";
import { SStudent } from "./student.service.js";
import createHttpError from "http-errors";

import { generateToken } from "../../../utils/generateToken.js";
import { env } from "../../../config/env.js";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SStudent.SCreateStudent(req as Request);

    if (!result) {
      throw createHttpError(400, "something went wrong");
    }

    const accessToken = generateToken({
      id: result.student._id as string,
      role: result.student.role,
    });
    const refreshToken = generateToken(
      { id: result.student._id as string, role: result.student.role },
      "7d"
    );

    res
      .status(201)
      .cookie("token", accessToken, {
        httpOnly: env.production ? true : false,
        secure: env.production ? true : false,
        sameSite: env.production ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: env.production ? true : false,
        secure: env.production ? true : false,
        sameSite: env.production ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SStudent.SUpdateStudent(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

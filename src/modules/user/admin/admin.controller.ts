import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { adminService } from "./admin.service.js";

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStudent = await adminService.SCreateAdmin(req.body, next);
    if (!newStudent) {
      return next(createHttpError(400, "Failed To Create Student"));
    }
    res.status(201).json({
      message: "Admin Account Creation Request Successfully",
    });
  } catch (error) {
    next(error);
  }
};

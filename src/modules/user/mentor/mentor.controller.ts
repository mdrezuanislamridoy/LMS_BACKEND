import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { mentorService } from "./mentor.service.js";

export const createMentor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStudent = await mentorService.SCreateMentor(req.body, next);
    if (!newStudent) {
      return next(createHttpError(400, "Failed To Create Student"));
    }
    res.status(201).json({
      message:
        "Mentor Account Creation Request Successful. Please wait for verification",
    });
  } catch (error) {
    next(error);
  }
};



export const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await MService.MBlock(id as string, next);
  } catch (error) {
    next(error);
  }
};


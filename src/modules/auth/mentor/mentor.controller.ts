import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { mentorService } from "./mentor.service.js";

export const createMentor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMentor = await mentorService.SCreateMentor(req.body, next);
    if (!newMentor) {
      return next(createHttpError(400, "Failed To Create Mentor"));
    }
    res.status(201).json({
      message:
        "Mentor Account Creation Request Successful. Please wait for verification",
    });
  } catch (error) {
    next(error);
  }
};

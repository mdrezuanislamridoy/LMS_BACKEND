import type { NextFunction, Request, Response } from "express";
import { SMeeting } from "./meeting.service.js";

export const createMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SMeeting.SCreateMeeting(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMeetings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SMeeting.SGetMeetings(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SMeeting.SGetMeeting(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SMeeting.SUpdateMeeting(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

import type { NextFunction, Request, Response } from "express";
import { SVideo } from "./video.service.js";

export const addVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SVideo.SAddVideo(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

import type { NextFunction, Request, Response } from "express";
import { MService } from "./module.service.js";

export const createModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await MService.SCreateModule(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await MService.SUpdateModule(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteModule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await MService.SDeleteModule(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


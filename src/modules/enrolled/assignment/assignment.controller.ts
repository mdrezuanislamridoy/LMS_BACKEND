import type { NextFunction, Request, Response } from "express";
import { AssignmentService } from "./assignment.service.js";

export const addAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.createAssignment(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.getAssignment(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.updateAssignment(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.deleteAssignment(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const submitAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.submitAssignment(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const setMarkIntoAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AssignmentService.setMarkIntoAssignment(
      req as Request
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

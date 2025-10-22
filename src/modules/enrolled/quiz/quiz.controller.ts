import type { NextFunction, Request, Response } from "express";
import quizService from "./quiz.service.js";

export const addQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await quizService.addQuiz(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await quizService.getQuiz(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await quizService.updateQuiz(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await quizService.deleteQuiz(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

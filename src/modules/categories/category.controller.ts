import type { NextFunction, Request, Response } from "express";

import type { ICategory } from "./category.interface.js";
import { CService } from "./category.service.js";

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CService.AddCategory(
      req as Request,
      req.body as ICategory,
      next as NextFunction
    );
    if (!category) {
      return res.status(400).json({ message: "category creation failed" });
    }

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CService.GetCategories();
    if (!categories) {
      return res.status(404).json({ message: "category Not Found" });
    }
    res
      .status(200)
      .json({ message: "category fetched successfully", categories });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CService.DeleteCategory(req.params.id as string);
    if (!category) {
      return res.status(404).json({ message: "category deletion failed" });
    }
    res
      .status(200)
      .json({ message: "category deleted successfully", category });
  } catch (error) {
    next(error);
  }
};

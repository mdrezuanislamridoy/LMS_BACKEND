import type { NextFunction, Request, Response } from "express";
import { CartService } from "./cart.service.js";

export const addToCartProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CartService.addToCart(req as Request);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CartService.getCartItem(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CartService.removeItem(req as Request);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { JwtPayload } from "jsonwebtoken";

export const checkRole =
  (...allowedRole: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw createHttpError(401, "Unauthorized: No user found");
    }

    if (!allowedRole.includes(req.user.role)) {
      throw createHttpError(
        401,
        "Forbidden: You don't have permission to access this resource"
      );
    }
    next();
  };

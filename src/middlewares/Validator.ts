import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ZodError } from "zod";
import z, { type ZodSchema } from "zod/v3";

export const validation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(", ");
        return next(createHttpError(400, message));
      }
      next(err);
    }
  };
};

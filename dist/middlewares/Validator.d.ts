import type { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod/v3";
export declare const validation: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=Validator.d.ts.map
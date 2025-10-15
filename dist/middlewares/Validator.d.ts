import type { NextFunction, Request, Response } from "express";
import z from "zod";
export declare const validation: (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=Validator.d.ts.map
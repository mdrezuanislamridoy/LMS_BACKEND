import type { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
export declare const validation: (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=Validator.d.ts.map
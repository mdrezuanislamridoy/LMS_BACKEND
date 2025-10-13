import type { NextFunction, Request, Response } from "express";
export declare const payBill: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const success: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const failed: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const canceled: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=payment.controller.d.ts.map
import type { NextFunction, Request, Response } from "express";
export declare const Enroll: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const getMyEnrollments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateEnrollmentStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=enrollment.controller.d.ts.map
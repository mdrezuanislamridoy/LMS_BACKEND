import type { NextFunction, Request, Response } from "express";
export declare const sendVerificationCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const profile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const sendForgetPassCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const forgetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map
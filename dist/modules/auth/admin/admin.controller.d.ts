import type { NextFunction, Request, Response } from "express";
export declare const createAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMentors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getStudents: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requestedMentors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const approveMentor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const rejectMentor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRejectedMentors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const blockUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const unBlockUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getBlockedAccounts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const undoDeleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDeletedAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addMentorToCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map
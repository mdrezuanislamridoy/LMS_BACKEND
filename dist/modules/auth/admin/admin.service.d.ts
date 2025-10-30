import type { NextFunction, Request } from "express";
import type { IUser } from "../user/user.interface.js";
import mongoose from "mongoose";
export declare const AService: {
    ACreate: (payload: IUser) => Promise<mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ABlock: (id: string, next: NextFunction) => Promise<mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    AUnBlock: (id: string, next: NextFunction) => Promise<mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ADelete: (id: string, next: NextFunction) => Promise<mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    AUndoDelete: (id: string, next: NextFunction) => Promise<mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addMentorToCourse: (req: Request) => Promise<{
        success: boolean;
        message: string;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map
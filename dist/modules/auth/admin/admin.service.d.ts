import type { NextFunction } from "express";
import type { IUser } from "../user/user.interface.js";
export declare const AService: {
    ACreate: (payload: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ABlock: (id: string, next: NextFunction) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    AUnBlock: (id: string, next: NextFunction) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ADelete: (id: string, next: NextFunction) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    AUndoDelete: (id: string, next: NextFunction) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map
import type { NextFunction, Request } from "express";
import type { IUser } from "./user.interface.js";
export declare const SUser: {
    USendCode: (email: string) => Promise<import("mongoose").Document<unknown, {}, import("../verificationCode.model.js").IVerifyCode, {}, import("mongoose").DefaultSchemaOptions> & import("../verificationCode.model.js").IVerifyCode & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ULogin: (email: string, password: string, next: NextFunction) => Promise<{
        user: IUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    UProfile: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    UUpdateUser: (id: string, payload: IUser) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    UDelete: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    UVerifyCode: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("../verificationCode.model.js").IVerifyCode, {}, import("mongoose").DefaultSchemaOptions> & import("../verificationCode.model.js").IVerifyCode & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    UChangePassword: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    UForgetPassword: (email: string, verificationCode: number, newPass: string) => Promise<{
        success: boolean;
        message: string;
    }>;
    USendForgetPassCode: (email: string) => Promise<{
        success: boolean;
        message: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map
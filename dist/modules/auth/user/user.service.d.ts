import type { NextFunction, Request } from "express";
import type { IUser } from "./user.interface.js";
export declare const SUser: {
    USendCode: (email: string) => Promise<import("mongoose").Document<unknown, {}, import("../verificationCode.model.js").IVerifyCode, {}, import("mongoose").DefaultSchemaOptions> & import("../verificationCode.model.js").IVerifyCode & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    ULogin: (email: string, password: string, next: NextFunction) => Promise<{
        user: {
            name: string;
            email: string;
            phone: string;
            role: "student" | "mentor" | "admin";
            mentorStatus: string;
            dateOfBirth?: Date;
            contactInfo?: import("./user.interface.js").Contact;
            socialAccounts?: import("./user.interface.js").Social;
            profileImg?: import("./user.interface.js").ProfileImg;
            gender?: "male" | "female" | "others";
            profession: string;
            isPasswordChanged?: boolean;
            isDeleted?: boolean;
            isBlocked?: boolean;
            refreshToken?: string;
            createdAt?: Date;
            updatedAt?: Date;
            _id: unknown;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
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
    UVerifyCode: (req: Request) => Promise<import("mongoose").Document<unknown, {}, import("../verificationCode.model.js").IVerifyCode, {}, import("mongoose").DefaultSchemaOptions> & import("../verificationCode.model.js").IVerifyCode & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
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
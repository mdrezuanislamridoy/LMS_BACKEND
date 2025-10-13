import type { NextFunction } from "express";
import type { IUser } from "../user/user.interface.js";
export declare const mentorService: {
    SCreateMentor: (payload: IUser, next: NextFunction) => Promise<void | (import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
};
//# sourceMappingURL=mentor.service.d.ts.map
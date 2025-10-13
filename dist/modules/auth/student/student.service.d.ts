import type { Request } from "express";
import type { IStudent } from "./student.interface.js";
export declare const SStudent: {
    SCreateStudent: (req: Request) => Promise<{
        success: boolean;
        message: string;
        student: import("mongoose").Document<unknown, {}, import("../user/user.interface.js").IUser & IStudent, {}, {}> & import("../user/user.interface.js").IUser & IStudent & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SUpdateStudent: (req: Request) => Promise<{
        student: import("mongoose").Document<unknown, {}, import("../user/user.interface.js").IUser & IStudent, {}, {}> & import("../user/user.interface.js").IUser & IStudent & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        success: boolean;
        message: string;
    }>;
};
//# sourceMappingURL=student.service.d.ts.map
import type { Request } from "express";
import { Types } from "mongoose";
export declare const MService: {
    SCreateModule: (req: Request) => Promise<{
        success: boolean;
        message: string;
        module: import("mongoose").Document<unknown, {}, import("./module.interface.js").IModules, {}, {}> & import("./module.interface.js").IModules & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    SUpdateModule: (req: Request) => Promise<{
        success: boolean;
        message: string;
        module: import("mongoose").Document<unknown, {}, import("./module.interface.js").IModules, {}, {}> & import("./module.interface.js").IModules & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    SDeleteModule: (req: Request) => Promise<{
        success: boolean;
        message: string;
        module: import("mongoose").Document<unknown, {}, import("./module.interface.js").IModules, {}, {}> & import("./module.interface.js").IModules & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=module.service.d.ts.map
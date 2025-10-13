import type { Request } from "express";
import type { IModules } from "../interfaces/module.interface.js";
export declare const MService: {
    SCreateModule: (req: Request) => Promise<import("mongoose").Document<unknown, {}, IModules, {}, {}> & IModules & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=module.service.d.ts.map
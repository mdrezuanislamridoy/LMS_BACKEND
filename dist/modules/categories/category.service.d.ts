import type { NextFunction, Request } from "express";
import type { ICategory } from "./category.interface.js";
export declare const CService: {
    Add: (req: Request, payload: ICategory, next: NextFunction) => Promise<void | (import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    Get: () => Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    Delete: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=category.service.d.ts.map
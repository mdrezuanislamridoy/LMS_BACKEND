import type { NextFunction, Request } from "express";
import type { ICategory } from "./category.interface.js";
export declare const CService: {
    AddCategory: (req: Request, payload: ICategory, next: NextFunction) => Promise<void | (import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    GetCategories: () => Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    DeleteCategory: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=category.service.d.ts.map
import type { NextFunction, Request } from "express";
import type { IReview } from "./review.interface.js";
export declare const SGetReviews: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, import("mongoose").DefaultSchemaOptions> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const SDeleteReview: (userId: string | undefined, id: string, next: NextFunction) => Promise<void | (import("mongoose").Document<unknown, {}, IReview, {}, import("mongoose").DefaultSchemaOptions> & IReview & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const RService: {
    SAddReview: (req: Request) => Promise<import("mongoose").Document<unknown, {}, IReview, {}, import("mongoose").DefaultSchemaOptions> & IReview & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    SGetReviews: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IReview, {}, import("mongoose").DefaultSchemaOptions> & IReview & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    SDeleteReview: (userId: string | undefined, id: string, next: NextFunction) => Promise<void | (import("mongoose").Document<unknown, {}, IReview, {}, import("mongoose").DefaultSchemaOptions> & IReview & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=review.service.d.ts.map
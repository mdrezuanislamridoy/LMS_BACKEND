import type { Request } from "express";
export declare const SPayBill: (req: Request) => Promise<{
    url: string;
    message: string;
    enrollment: import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("../enrollment/enrollment.interface.js").IEnrollment, {
        user: {
            name: string;
            email: string;
        };
    }>, {}, {}> & Omit<import("../enrollment/enrollment.interface.js").IEnrollment, "user"> & {
        user: {
            name: string;
            email: string;
        };
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const SPayment: {
    SPayBill: (req: Request) => Promise<{
        url: string;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("../enrollment/enrollment.interface.js").IEnrollment, {
            user: {
                name: string;
                email: string;
            };
        }>, {}, {}> & Omit<import("../enrollment/enrollment.interface.js").IEnrollment, "user"> & {
            user: {
                name: string;
                email: string;
            };
        } & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map
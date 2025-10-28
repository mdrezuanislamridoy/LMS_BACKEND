import type { Request } from "express";
export declare const SPayBill: (req: Request) => Promise<{
    url: any;
    tran_id: string;
    message: string;
    enrollment: import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("../enrollment/enrollment.interface.js").IEnrollment, {
        user: {
            name: string;
            email: string;
        };
        courseId: {
            title: string;
        };
    }>, {}, {}> & Omit<import("../enrollment/enrollment.interface.js").IEnrollment, "user" | "courseId"> & {
        user: {
            name: string;
            email: string;
        };
        courseId: {
            title: string;
        };
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
    transactionId: string;
    success?: never;
} | {
    success: boolean;
    message: string;
    url?: never;
    tran_id?: never;
    enrollment?: never;
    transactionId?: never;
}>;
export declare const SPayment: {
    SPayBill: (req: Request) => Promise<{
        url: any;
        tran_id: string;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("mongoose").MergeType<import("../enrollment/enrollment.interface.js").IEnrollment, {
            user: {
                name: string;
                email: string;
            };
            courseId: {
                title: string;
            };
        }>, {}, {}> & Omit<import("../enrollment/enrollment.interface.js").IEnrollment, "user" | "courseId"> & {
            user: {
                name: string;
                email: string;
            };
            courseId: {
                title: string;
            };
        } & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        transactionId: string;
        success?: never;
    } | {
        success: boolean;
        message: string;
        url?: never;
        tran_id?: never;
        enrollment?: never;
        transactionId?: never;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map
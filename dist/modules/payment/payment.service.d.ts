import type { Request } from "express";
export declare const SPayBill: (req: Request) => Promise<{
    url: any;
    tran_id: string;
    message: string;
    success?: never;
} | {
    success: boolean;
    message: any;
    url?: never;
    tran_id?: never;
}>;
export declare const SPayment: {
    SPayBill: (req: Request) => Promise<{
        url: any;
        tran_id: string;
        message: string;
        success?: never;
    } | {
        success: boolean;
        message: any;
        url?: never;
        tran_id?: never;
    }>;
    SSuccess: (req: Request) => Promise<{
        success: boolean;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("../enrollment/enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("../enrollment/enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SFail: (req: Request) => Promise<{
        success: boolean;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("../enrollment/enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("../enrollment/enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SCancel: (req: Request) => Promise<{
        success: boolean;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("../enrollment/enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("../enrollment/enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map
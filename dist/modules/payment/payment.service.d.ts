import type { Request } from "express";
export declare const SPayBill: (req: Request) => Promise<{
    url: any;
    message: string;
    enrollment: import("mongoose").Document<unknown, {}, import("../enrollment/enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("../enrollment/enrollment.interface.js").IEnrollment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const SPayment: {
    SPayBill: (req: Request) => Promise<{
        url: any;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("../enrollment/enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("../enrollment/enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map
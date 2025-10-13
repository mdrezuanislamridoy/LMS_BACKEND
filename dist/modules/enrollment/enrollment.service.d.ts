import type { NextFunction, Request } from "express";
export declare const SEnrollment: {
    SEnroll: (req: Request) => Promise<{
        success: boolean;
        message: string;
        enrollment: import("mongoose").Document<unknown, {}, import("./enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("./enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SGetMyEnrollments: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("./enrollment.interface.js").IEnrollment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    SUpdateEnrollmentStatus: (req: Request, status: string, next: NextFunction) => Promise<(import("mongoose").Document<unknown, {}, import("./enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("./enrollment.interface.js").IEnrollment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=enrollment.service.d.ts.map
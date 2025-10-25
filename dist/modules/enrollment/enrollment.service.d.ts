import type { Request } from "express";
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
    SGetMyEnrollments: (req: Request) => Promise<{
        total: number;
        success: boolean;
        message: string;
        enrollments: (import("mongoose").Document<unknown, {}, import("./enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("./enrollment.interface.js").IEnrollment & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        completed: number;
    }>;
    SUpdateEnrollmentStatus: (req: Request) => Promise<(import("mongoose").Document<unknown, {}, import("./enrollment.interface.js").IEnrollment, {}, import("mongoose").DefaultSchemaOptions> & import("./enrollment.interface.js").IEnrollment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    SUpdateVideoProgress: (req: Request) => Promise<{
        success: boolean;
        message: string;
        progress: {
            finishedModules: import("mongoose").Types.ObjectId[];
            finishedVideos: import("mongoose").Types.ObjectId[];
            totalModules: number;
            totalVideos: number;
            percentage: number;
            lastAccessedVideo: import("mongoose").Types.ObjectId;
        };
    }>;
};
//# sourceMappingURL=enrollment.service.d.ts.map
import type { Request } from "express";
import type { ICourse } from "./course.interface.js";
interface QueryParams {
    search?: string;
    category?: string;
    level?: string;
    sort?: string;
    pageNumber?: string | number;
    limit?: string | number;
}
export declare const courseService: {
    createCourseService: (req: Request, payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getSingleCourseService: (courseId: string) => Promise<import("mongoose").FlattenMaps<ICourse> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }>;
    getCoursesService: (req: Request<{}, {}, {}, QueryParams>) => Promise<{
        success: boolean;
        message: string;
        total: number;
        courses: (import("mongoose").FlattenMaps<ICourse> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        totalPage: number;
    }>;
    updateCourseService: (courseId: string, data: ICourse) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteCourseService: (courseId: string) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, import("mongoose").DefaultSchemaOptions> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getFeaturedCoursesService: (req: Request) => Promise<{
        success: boolean;
        message: string;
        courses: (import("mongoose").FlattenMaps<ICourse> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
    }>;
    topCourses: (req: Request) => Promise<any[]>;
};
export {};
//# sourceMappingURL=course.service.d.ts.map
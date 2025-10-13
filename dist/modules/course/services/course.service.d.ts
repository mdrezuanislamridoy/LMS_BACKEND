import type { Request } from "express";
import type { ICourse } from "../interfaces/course.interface.js";
export declare const courseService: {
    createCourseService: (req: Request, payload: ICourse) => Promise<import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getSingleCourseService: (courseId: string) => Promise<import("mongoose").FlattenMaps<ICourse> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }>;
    getCoursesService: () => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateCourseService: (courseId: string, data: ICourse) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteCourseService: (courseId: string) => Promise<(import("mongoose").Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=course.service.d.ts.map
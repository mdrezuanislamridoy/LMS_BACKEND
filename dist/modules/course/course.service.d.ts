import type { Request } from "express";
import type { ICourse } from "./course.interface.js";
export declare const courseService: {
    createCourseService: (req: Request, payload: ICourse) => Promise<any>;
    getSingleCourseService: (courseId: string) => Promise<any>;
    getCoursesService: (req: Request) => Promise<{
        success: boolean;
        message: string;
        total: any;
        courses: any;
    }>;
    updateCourseService: (courseId: string, data: ICourse) => Promise<any>;
    deleteCourseService: (courseId: string) => Promise<any>;
};
//# sourceMappingURL=course.service.d.ts.map
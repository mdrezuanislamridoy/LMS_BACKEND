import type { Request, Response, NextFunction } from "express";
export declare const courseController: {
    createCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCourses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=course.controller.d.ts.map
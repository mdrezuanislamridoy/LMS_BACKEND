import createHttpError from "http-errors";
import { courseService } from "./course.service.js";
export const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourseService(req, req.body);
        if (!course) {
            return next(createHttpError(400, "Course creation failed"));
        }
        res
            .status(201)
            .json({ success: true, message: "Course created successfully", course });
    }
    catch (error) {
        next(error);
    }
};
export const getSingleCourse = async (req, res, next) => {
    try {
        const course = await courseService.getSingleCourseService(req.params.id);
        if (!course) {
            return next(createHttpError(404, "Course not found"));
        }
        res
            .status(200)
            .json({ success: true, message: "Course fetched successfully", course });
    }
    catch (error) {
        next(error);
    }
};
export const getCourses = async (req, res, next) => {
    try {
        const result = await courseService.getCoursesService(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getFeaturedCourses = async (req, res, next) => {
    try {
        const result = await courseService.getFeaturedCoursesService(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateCourse = async (req, res, next) => {
    try {
        const updatedCourse = await courseService.updateCourseService(req.params.id, req.body);
        if (!updatedCourse) {
            return next(createHttpError(400, "Course update failed"));
        }
        res
            .status(200)
            .json({
            success: true,
            message: "Course updated successfully",
            updatedCourse,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCourse = async (req, res, next) => {
    try {
        const deletedCourse = await courseService.deleteCourseService(req.params.id);
        if (!deletedCourse) {
            return next(createHttpError(400, "Course deletion failed"));
        }
        res
            .status(200)
            .json({
            success: true,
            message: "Course deleted successfully",
            deletedCourse,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=category.service.js.map
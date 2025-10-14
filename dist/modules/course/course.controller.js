import createHttpError from "http-errors";
import { courseService } from "./course.service.js";
const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourseService(req, req.body);
        if (!course) {
            return next(createHttpError(400, "Course Creation Failed"));
        }
        res.status(201).json({ message: "Course Created Successfully", course });
    }
    catch (error) {
        next(error);
    }
};
const getSingleCourse = async (req, res, next) => {
    try {
        const course = await courseService.getSingleCourseService(req.params.id);
        if (!course) {
            return next(createHttpError(404, "course not found"));
        }
        res.status(201).json({ message: "course fetched successfully", course });
    }
    catch (error) {
        next(error);
    }
};
const getCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCoursesService();
        if (!courses) {
            return next(createHttpError(404, "courses not found"));
        }
        res.status(201).json({ message: "course fetched successfully", courses });
    }
    catch (error) {
        next(error);
    }
};
const updateCourse = async (req, res, next) => {
    try {
        const updatedCourse = await courseService.updateCourseService(req.params.id, req.body);
        if (!updatedCourse) {
            return next(createHttpError);
        }
        res
            .status(200)
            .json({ message: "Course Updated Successful", updatedCourse });
    }
    catch (error) {
        next(error);
    }
};
const deleteCourse = async (req, res, next) => {
    try {
        const deletedCourse = await courseService.deleteCourseService(req.params.id);
        if (!deletedCourse) {
            return next(createHttpError(400).json({
                message: "Course deletion failed",
                deletedCourse,
            }));
        }
    }
    catch (error) {
        next(error);
    }
};
export const courseController = {
    createCourse,
    getSingleCourse,
    getCourses,
    updateCourse,
    deleteCourse,
};
//# sourceMappingURL=course.controller.js.map
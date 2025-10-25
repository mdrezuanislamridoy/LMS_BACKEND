import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { courseService } from "./course.service.js";
import type { ICourse } from "./course.interface.js";

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseService.createCourseService(
      req,
      req.body as ICourse
    );

    if (!course) {
      return next(createHttpError(400, "Course creation failed"));
    }

    res
      .status(201)
      .json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseService.getSingleCourseService(req.params.id);

    if (!course) {
      return next(createHttpError(404, "Course not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Course fetched successfully", course });
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await courseService.getCoursesService(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await courseService.getFeaturedCoursesService(req);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCourse = await courseService.updateCourseService(
      req.params.id,
      req.body as ICourse
    );

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
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCourse = await courseService.deleteCourseService(
      req.params.id
    );

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
  } catch (error) {
    next(error);
  }
};

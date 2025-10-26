import type { Request, NextFunction } from "express";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import { CourseModel } from "../../course/course.model.js";
import { Quiz } from "./quiz.model.js";
import type { IQuiz } from "./quiz.interface.js"; // Assumed interface
import type { IUser } from "../../auth/user/user.interface.js";
import { sendMail } from "../../../utils/sendMail.js";

// Define Course interface for populated course field
interface ICourse {
  _id: Types.ObjectId;
  instructors: Types.ObjectId[];
  // Add other fields as needed
}

const addQuiz = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const courseId = req.params.courseId;
    const moduleId = req.body.moduleId;

    // Validate inputs
    if (!courseId) {
      throw createHttpError(400, "Course ID is required");
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }
    if (!moduleId || !Types.ObjectId.isValid(moduleId)) {
      throw createHttpError(400, "Invalid module ID");
    }

    const course = await CourseModel.findById(courseId).populate<{
      instructors: Types.ObjectId[];
    }>("instructors");

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    if (
      req.user.role === "admin" ||
      (req.user.role === "mentor" &&
        course.instructors?.some((instructor) =>
          instructor.equals(req.user!._id)
        ))
    ) {
      const quiz = await Quiz.create({
        ...req.body,
        courseId: new Types.ObjectId(courseId),
        moduleId: new Types.ObjectId(moduleId),
      });

      return {
        success: true,
        message: "Quiz added successfully",
        quiz,
      };
    } else {
      throw createHttpError(403, "You're not allowed to add quiz");
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to add quiz"
      )
    );
  }
};

const updateQuiz = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const quizId = req.params.quizId;

    // Validate quizId
    if (!quizId) {
      throw createHttpError(400, "Quiz ID is required");
    }
    if (!Types.ObjectId.isValid(quizId)) {
      throw createHttpError(400, "Invalid quiz ID");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw createHttpError(404, "Quiz not found");
    }

    const course = await CourseModel.findById(quiz.courseId).populate<{
      instructors: Types.ObjectId[];
    }>("instructors");

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    if (
      req.user.role === "admin" ||
      (req.user.role === "mentor" &&
        course.instructors?.some((instructor) =>
          instructor.equals(req.user!._id)
        ))
    ) {
      const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
        new: true,
      });

      if (!updatedQuiz) {
        throw createHttpError(404, "Quiz not found after update");
      }

      return {
        success: true,
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
      };
    } else {
      throw createHttpError(403, "You're not allowed to update quiz");
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to update quiz"
      )
    );
  }
};

const deleteQuiz = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const quizId = req.params.quizId;

    // Validate quizId
    if (!quizId) {
      throw createHttpError(400, "Quiz ID is required");
    }
    if (!Types.ObjectId.isValid(quizId)) {
      throw createHttpError(400, "Invalid quiz ID");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw createHttpError(404, "Quiz not found");
    }

    const course = await CourseModel.findById(quiz.courseId).populate<{
      instructors: Types.ObjectId[];
    }>("instructors");

    if (!course) {
      throw createHttpError(404, "Course not found");
    }

    if (
      req.user.role === "admin" ||
      (req.user.role === "mentor" &&
        course.instructors?.some((instructor) =>
          instructor.equals(req.user!._id)
        ))
    ) {
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

      if (!deletedQuiz) {
        throw createHttpError(404, "Quiz not found after deletion");
      }

      return {
        success: true,
        message: "Quiz deleted successfully",
        quiz: deletedQuiz,
      };
    } else {
      throw createHttpError(403, "You're not allowed to delete quiz");
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to delete quiz"
      )
    );
  }
};

const getQuiz = async (req: Request, next: NextFunction) => {
  try {
    const moduleId = req.params.moduleId;

    // Validate moduleId
    if (!moduleId) {
      throw createHttpError(400, "Module ID is required");
    }
    if (!Types.ObjectId.isValid(moduleId)) {
      throw createHttpError(400, "Invalid module ID");
    }

    const quizzes = await Quiz.find({ moduleId: new Types.ObjectId(moduleId) });

    return {
      success: true,
      message: "Quizzes fetched successfully",
      quizzes,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to fetch quizzes"
      )
    );
  }
};

export default {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  getQuiz,
};

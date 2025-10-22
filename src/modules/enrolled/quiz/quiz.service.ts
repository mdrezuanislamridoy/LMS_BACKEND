import type { Types } from "mongoose";
import type { IUser } from "../../auth/user/user.interface.js";
import { CourseModel } from "../../course/course.model.js";
import { Quiz } from "./quiz.model.js";
import createHttpError from "http-errors";
import type { Request } from "express";

const addQuiz = async (req: Request) => {
  const courseId = req.params.courseId;
  const moduleId = req.body.moduleId;
  const user: IUser | null = req.user;

  const course = await CourseModel.findById(courseId).populate("instructors");

  if (
    user?.role === "admin" ||
    (user?.role === "mentor" && course?.instructors?.includes(user?._id))
  ) {
    const quiz = await Quiz.create({ ...req.body, courseId, moduleId });

    return {
      success: true,
      message: "Quiz added successfully",
      quiz,
    };
  } else {
    throw createHttpError(401, "You're not allowed to add quiz");
  }
};
const updateQuiz = async (req: Request) => {
  const id = req.params.quizId;
  const user: IUser = req.user;

  const quiz = await Quiz.findById(id);

  const course = await CourseModel.findById(quiz?.courseId).populate(
    "instructors"
  );

  if (
    user.role === "admin" ||
    (user.role === "mentor" && course?.instructors?.includes(user._id))
  ) {
    const quiz = await Quiz.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return {
      success: true,
      message: "Quiz updated successfully",
      quiz,
    };
  } else {
    throw createHttpError(401, "You're not allowed to update quiz");
  }
};

const deleteQuiz = async (req: Request) => {
  const quizId = req.params.quizId;
  const user = req.user;
  const quiz = await Quiz.findById(quizId);

  const course = await CourseModel.findById(quiz?.courseId).populate(
    "instructors"
  );

  if (
    user.role === "admin" ||
    (user.role === "mentor" && course?.instructors?.includes(user._id))
  ) {
    const deletedData = await Quiz.findByIdAndDelete(quizId);

    return {
      success: true,
      message: "Quiz deleted successfully",
      deletedData,
    };
  }
};
const getQuiz = async (req: Request) => {
  const moduleId = req.params.moduleId;

  const quiz = await Quiz.find({ moduleId });
  if (!quiz) {
    throw createHttpError(404, "Quiz not found");
  }

  return {
    success: true,
    message: "Quiz fetched successfully",
    quiz,
  };
};

export default { addQuiz, updateQuiz, deleteQuiz, getQuiz };

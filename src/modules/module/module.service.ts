import type { Request } from "express";
import createHttpError from "http-errors";
import { CourseModel } from "../course/course.model.js";
import { CourseModule } from "./module.model.js";

const SCreateModule = async (req: Request) => {
  const courseId = req.params.id;

  let data = req.body;
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw createHttpError(404, "Course Not Found");
  }

  const module = await CourseModule.create(data);

  course.modules.push(module._id);

  course.save();
};

export const MService = {
  SCreateModule,
};

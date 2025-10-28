import type { Request } from "express";
import createHttpError from "http-errors";
import { CourseModel } from "../course/course.model.js";
import { CourseModule } from "./module.model.js";
import type { ICourse } from "../course/course.interface.js";

const SCreateModule = async (req: Request) => {
  const courseId = req.params.id;
  const course: ICourse | null = await CourseModel.findById(courseId);
  if (!course) throw createHttpError(404, "Course not found");

  const user = req.user;
  if (user.role === "mentor" && !course.instructors.includes(user._id)) {
    throw createHttpError(403, "You are not allowed to add modules");
  }

  const module = await CourseModule.create(req.body);
  course.modules.push(module._id);
  await course.save();

  return {
    success: true,
    message: "Module added successfully",
    module,
  };
};

const SUpdateModule = async (req: Request) => {
  const moduleId = req.params.id;
  const user = req.user;

  const course = await CourseModel.findOne({ modules: moduleId });
  if (!course) throw createHttpError(404, "Module's course not found");

  if (user.role === "mentor" && !course.instructors.includes(user._id)) {
    throw createHttpError(403, "You're not allowed to update this module");
  }

  const module = await CourseModule.findByIdAndUpdate(moduleId, req.body, {
    new: true,
  });
  if (!module) throw createHttpError(404, "Module update failed");

  return {
    success: true,
    message: "Module updated successfully",
    module,
  };
};

const SDeleteModule = async (req: Request) => {
  const moduleId = req.params.id;
  const user = req.user;

  const course = await CourseModel.findOne({ modules: moduleId });
  if (!course) throw createHttpError(404, "Module's course not found");

  if (user.role === "mentor" && !course.instructors.includes(user._id)) {
    throw createHttpError(403, "You're not allowed to delete this module");
  }

  const module = await CourseModule.findByIdAndDelete(moduleId);
  if (!module) throw createHttpError(404, "Module deletion failed");

  course.modules.pull(moduleId);
  await course.save();

  return {
    success: true,
    message: "Module deleted successfully",
    module,
  };
};

export const MService = {
  SCreateModule,
  SUpdateModule,
  SDeleteModule,
};

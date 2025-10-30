import type { Request } from "express";
import createHttpError from "http-errors";
import { CourseModel } from "../course/course.model.js";
import { CourseModule } from "./module.model.js";
import type { ICourse } from "../course/course.interface.js";
import type { IUser } from "../auth/user/user.interface.js";
import { Types } from "mongoose";

const ensureUser = (user: IUser | undefined): IUser => {
  if (!user) throw createHttpError(401, "User not authenticated");
  return user;
};

const SCreateModule = async (req: Request) => {
  const user = ensureUser(req.user);
  const courseId = req.params.id;

  const course: ICourse | null = await CourseModel.findById(courseId);
  if (!course) throw createHttpError(404, "Course not found");

  if (
    user.role === "mentor" &&
    !course.instructors.some((id) => id.equals(user._id as Types.ObjectId))
  ) {
    throw createHttpError(403, "You are not allowed to add modules");
  }

  const module = await CourseModule.create(req.body);
  course.modules.push(module._id as Types.ObjectId);
  await course.save();

  return {
    success: true,
    message: "Module added successfully",
    module,
  };
};



const SUpdateModule = async (req: Request) => {
  const user = ensureUser(req.user);
  const moduleId = req.params.id;

  const course = await CourseModel.findOne({ modules: moduleId });
  if (!course) throw createHttpError(404, "Module's course not found");

  if (
    user.role === "mentor" &&
    !course.instructors.some((id) => id.equals(user._id as Types.ObjectId))
  ) {
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
  const user = ensureUser(req.user);
  const moduleId = req.params.id;

  const course = await CourseModel.findOne({ modules: moduleId });
  if (!course) throw createHttpError(404, "Module's course not found");

  if (
    user.role === "mentor" &&
    !course.instructors.some((id) => id.equals(user._id as Types.ObjectId))
  ) {
    throw createHttpError(403, "You're not allowed to delete this module");
  }

  const module = await CourseModule.findByIdAndDelete(moduleId);
  if (!module) throw createHttpError(404, "Module deletion failed");

  course.modules.pull(new Types.ObjectId(moduleId));
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

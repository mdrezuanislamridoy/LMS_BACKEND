import createHttpError from "http-errors";
import { CourseModel } from "../course/course.model.js";
import { CourseModule } from "./module.model.js";
import { Types } from "mongoose";
const ensureUser = (user) => {
    if (!user)
        throw createHttpError(401, "User not authenticated");
    return user;
};
const SCreateModule = async (req) => {
    const user = ensureUser(req.user);
    const courseId = req.params.id;
    const course = await CourseModel.findById(courseId);
    if (!course)
        throw createHttpError(404, "Course not found");
    if (user.role === "mentor" &&
        !course.instructors.some((id) => id.equals(user._id))) {
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
const SUpdateModule = async (req) => {
    const user = ensureUser(req.user);
    const moduleId = req.params.id;
    const course = await CourseModel.findOne({ modules: moduleId });
    if (!course)
        throw createHttpError(404, "Module's course not found");
    if (user.role === "mentor" &&
        !course.instructors.some((id) => id.equals(user._id))) {
        throw createHttpError(403, "You're not allowed to update this module");
    }
    const module = await CourseModule.findByIdAndUpdate(moduleId, req.body, {
        new: true,
    });
    if (!module)
        throw createHttpError(404, "Module update failed");
    return {
        success: true,
        message: "Module updated successfully",
        module,
    };
};
const SDeleteModule = async (req) => {
    const user = ensureUser(req.user);
    const moduleId = req.params.id;
    const course = await CourseModel.findOne({ modules: moduleId });
    if (!course)
        throw createHttpError(404, "Module's course not found");
    if (user.role === "mentor" &&
        !course.instructors.some((id) => id.equals(user._id))) {
        throw createHttpError(403, "You're not allowed to delete this module");
    }
    const module = await CourseModule.findByIdAndDelete(moduleId);
    if (!module)
        throw createHttpError(404, "Module deletion failed");
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
//# sourceMappingURL=module.service.js.map
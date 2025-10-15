import createHttpError from "http-errors";
import { CourseModel } from "../course/course.model.js";
import { CourseModule } from "./module.model.js";
import { UserModel } from "../auth/user/user.model.js";
const SCreateModule = async (req) => {
    const courseId = req.params.id;
    let data = req.body;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course Not Found");
    }
    const user = req.user;
    if (user.role === "mentor" && !course.instructors.includes(user._id)) {
        throw createHttpError(401, "You are not allowed to add modules");
    }
    const module = await CourseModule.create(data);
    course.modules.push(module._id);
    course.save();
    return {
        success: true,
        message: "Module added successfully",
        module,
    };
};
const SUpdateModule = async (req) => {
    const moduleId = req.params.id;
    const user = req.user;
    const course = await CourseModel.findOne({ modules: moduleId });
    if (user.role === "mentor" && !course.instructors.includes()) {
        throw createHttpError(400, "You're not allowed to do this");
    }
    const module = await CourseModule.findByIdAndUpdate(moduleId, req.body, {
        new: true,
    });
    if (!module) {
        throw createHttpError(400, "Module updation failed");
    }
    return {
        success: true,
        message: "Module updated successfully",
        module,
    };
};
const SDeleteModule = async (req) => {
    const moduleId = req.params.id;
    const user = req.user;
    const course = await CourseModel.findOne({ modules: moduleId });
    if (user.role === "mentor" && !course.instructors.includes()) {
        throw createHttpError(400, "You're not allowed to do this");
    }
    const module = await CourseModule.findByIdAndDelete(moduleId);
    if (!module) {
        throw createHttpError(400, "Module updation failed");
    }
    return {
        success: true,
        message: "Module updated successfully",
        module,
    };
};
export const MService = {
    SCreateModule,
    SUpdateModule,
    SDeleteModule,
};
//# sourceMappingURL=module.service.js.map
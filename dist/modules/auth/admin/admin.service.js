import createHttpError from "http-errors";
import { sendMail } from "../../../utils/sendMail.js";
import bcrypt from "bcrypt";
import { UserModel } from "../user/user.model.js";
import { Admin } from "./admin.model.js";
import { CourseModel } from "../../course/course.model.js";
import mongoose from "mongoose";
const ACreate = async (payload) => {
    const hashedPass = await bcrypt.hash(payload.password, 10);
    const user = await UserModel.findOne({ email: payload.email });
    if (user) {
        throw createHttpError(400, "Account already exist");
    }
    return await Admin.create({
        ...payload,
        password: hashedPass,
        role: "admin",
    });
};
const ABlock = async (id, next) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw createHttpError(400, "user didn't matched ");
    }
    user.isBlocked = true;
    await user.save();
    await sendMail(user.email, "Your account has been blocked by admin", `
        
    `);
    return user;
};
const AUnBlock = async (id, next) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw createHttpError(400, "user didn't matched ");
    }
    user.isBlocked = false;
    await user.save();
    await sendMail(user.email, "Your account has been unblocked by admin", `
        
    `);
    return user;
};
const ADelete = async (id, next) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw createHttpError(400, "user didn't matched ");
    }
    user.isDeleted = true;
    await user.save();
    await sendMail(user.email, "Your account has been deleted by admin", `
        
    `);
    return user;
};
const AUndoDelete = async (id, next) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw createHttpError(400, "user didn't matched ");
    }
    user.isDeleted = false;
    await user.save();
    await sendMail(user.email, "Your account is now reusable", `
        
    `);
    return user;
};
const addMentorToCourse = async (req) => {
    const courseId = req.body.id;
    const mentorId = req.params.id;
    if (!courseId || !mentorId) {
        throw createHttpError(400, "Something went wrong");
    }
    const course = await CourseModel.findById(courseId);
    if (!course)
        throw createHttpError(404, "Course not found");
    const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
    const alreadyExists = course.instructors.some((id) => id.toString() === mentorId);
    if (!alreadyExists) {
        course.instructors.push(mentorObjectId);
        await course.save();
    }
    return {
        success: true,
        message: `Mentor Added to ${course.title} course successfully`,
    };
};
export const AService = {
    ACreate,
    ABlock,
    AUnBlock,
    ADelete,
    AUndoDelete,
    addMentorToCourse,
};
//# sourceMappingURL=admin.service.js.map
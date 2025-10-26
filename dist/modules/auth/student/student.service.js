import { Student } from "./student.model.js";
import { VerifyCode } from "../verificationCode.model.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { UserModel } from "../user/user.model.js";
const SCreateStudent = async (req) => {
    const data = req.body;
    const isVerified = await VerifyCode.findOne({
        email: req.body.email,
        verificationCode: req.body.verificationCode,
    });
    if (!isVerified?.verified) {
        throw createHttpError(400, "You're not verified");
    }
    const student = await UserModel.findOne({ email: isVerified.email });
    if (student) {
        throw createHttpError(400, "User Already exists");
    }
    await VerifyCode.deleteMany({ email: isVerified.email });
    const role = "student";
    const password = await bcrypt.hash(req.body.password, 10);
    const newStudent = await Student.create({
        ...data,
        role,
        password,
        mentorStatus: "no",
    });
    if (!newStudent) {
        throw createHttpError(400, "Student creation failed");
    }
    return {
        success: true,
        message: "Student account created successfully",
        student: newStudent,
    };
};
const SUpdateStudent = async (req) => {
    if (!req.user) {
        throw createHttpError(401, "User not authenticated");
    }
    const userId = req.user.id;
    const student = await Student.findByIdAndUpdate(userId, req.body, {
        new: true,
    });
    if (!student) {
        throw createHttpError(400, "Student updation failed");
    }
    return {
        student,
        success: true,
        message: "Student updated successfull",
    };
};
export const SStudent = {
    SCreateStudent,
    SUpdateStudent,
};
//# sourceMappingURL=student.service.js.map
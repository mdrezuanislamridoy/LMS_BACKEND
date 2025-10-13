import { Student } from "./student.model.js";
import { VerifyCode } from "../verificationCode.model.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
const SCreateStudent = async (req) => {
    const data = req.body;
    await VerifyCode.deleteOne({ email: req.body.email });
    const role = "student";
    const password = await bcrypt.hash(req.body.password, 10);
    const student = await Student.create({ ...data, role, password });
    if (!student) {
        throw createHttpError(400, "Student creation failed");
    }
    return {
        success: true,
        message: "Student account created successfully",
        student,
    };
};
const SUpdateStudent = async (req) => {
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
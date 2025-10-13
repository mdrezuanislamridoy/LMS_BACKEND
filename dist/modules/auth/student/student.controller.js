import { SStudent } from "./student.service.js";
import createHttpError from "http-errors";
import { generateToken } from "../../../utils/generateToken.js";
import { env } from "../../../config/env.js";
export const createStudent = async (req, res, next) => {
    try {
        const result = await SStudent.SCreateStudent(req);
        if (!result) {
            throw createHttpError(400, "something went wrong");
        }
        const accessToken = generateToken({
            id: result.student._id,
            role: result.student.role,
        });
        const refreshToken = generateToken({ id: result.student._id, role: result.student.role }, "7d");
        res
            .status(201)
            .cookie("token", accessToken, {
            httpOnly: env.production ? true : false,
            secure: env.production ? true : false,
            sameSite: env.production ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            httpOnly: env.production ? true : false,
            secure: env.production ? true : false,
            sameSite: env.production ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateStudent = async (req, res, next) => {
    try {
        const result = await SStudent.SUpdateStudent(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=student.controller.js.map
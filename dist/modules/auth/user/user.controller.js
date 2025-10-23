import createHttpError from "http-errors";
import dotenv from "dotenv";
import { SUser } from "./user.service.js";
import { env } from "../../../config/env.js";
dotenv.config();
export const sendVerificationCode = async (req, res, next) => {
    try {
        const result = await SUser.USendCode(req.body.email);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const verifyCode = async (req, res, next) => {
    try {
        const resp = await SUser.UVerifyCode(req);
        if (!resp) {
            return next(createHttpError(400, "Code didn't matched, Try again"));
        }
        res
            .status(200)
            .json({ success: true, message: "Code verified successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const result = await SUser.ULogin(email, password, next);
        if (!result) {
            return next(createHttpError(400, "Login failed"));
        }
        res
            .status(200)
            .cookie("token", result.accessToken, {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: env.node_env === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
        })
            .cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: env.node_env === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .json({
            success: true,
            message: "User Fetched Successfully",
            user: result.user,
        });
    }
    catch (error) {
        next(error);
    }
};
export const profile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await SUser.UUpdateUser(req.user._id, req.body);
        if (!updatedUser) {
            return next(createHttpError(400, "User Updation failed"));
        }
        res.status(201).json({
            success: true,
            message: "User Updation Successful",
            updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        const id = req.user._id;
        const deletedUser = await SUser.UDelete(id);
        if (!deletedUser) {
            return next(createHttpError(400).json({
                message: "User Deletion Failed",
                deleteUser,
            }));
        }
        res
            .status(200)
            .json({ success: true, message: "User Deleted Successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const changePassword = async (req, res, next) => {
    try {
        const user = await SUser.UChangePassword(req);
        res.status(200).json({ success: true, user, message: "Password changed" });
    }
    catch (error) {
        next(error);
    }
};
export const sendForgetPassCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await SUser.USendForgetPassCode(email);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const forgetPassword = async (req, res, next) => {
    try {
        const { email, verificationCode, newPass } = req.body;
        const result = await SUser.UForgetPassword(email, verificationCode, newPass);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: env.node_env === "production" ? "none" : "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.node_env === "production",
            sameSite: env.node_env === "production" ? "none" : "lax",
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map
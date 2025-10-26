import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/sendMail.js";
import { VerifyCode } from "../verificationCode.model.js";
import { UserModel } from "./user.model.js";
import { generateToken } from "../../../utils/generateToken.js";
const USendCode = async (email) => {
    const user = await UserModel.findOne({ email });
    if (user) {
        throw createHttpError(400, "User already exist");
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const result = await VerifyCode.create({ email, verificationCode });
    if (!result) {
        throw createHttpError(400, "Failed to create verification code");
    }
    console.log(result);
    await sendMail(email, "Your RR-LMS verification code", `${verificationCode}`);
    return result;
};
const UVerifyCode = async (req) => {
    const result = await VerifyCode.findOne({
        email: req.body.email,
        verificationCode: req.body.verificationCode,
    });
    if (!result) {
        throw createHttpError(400, "Verification failed");
    }
    result.verified = true;
    await result.save();
    return result;
};
const ULogin = async (email, password, next) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User Not Found");
    }
    if (user.role === "mentor" &&
        (user.isBlocked || user.isDeleted || user.mentorStatus !== "yes")) {
        throw createHttpError(401, "Your'e not allowed to login");
    }
    if (user.isBlocked) {
        throw createHttpError(401, "Your account has been blocked");
    }
    if (user.isDeleted) {
        throw createHttpError(400, "Your account is deleted");
    }
    const isPassMatched = await bcrypt.compare(password, user.password);
    if (!isPassMatched) {
        throw createHttpError(400, "Password didn't matched");
    }
    const accessToken = generateToken({
        id: user._id,
        role: user.role,
    }, "1h");
    const refreshToken = generateToken({ id: user._id, role: user.role }, "7d");
    user.refreshToken = refreshToken;
    await user.save();
    const { password: _, ...userData } = user.toObject();
    return {
        user: userData,
        accessToken,
        refreshToken,
    };
};
const UProfile = async (userId) => {
    return await UserModel.findById(userId).select("-password");
};
const UUpdateUser = async (id, payload) => {
    return await UserModel.findByIdAndUpdate(id, payload, { new: true });
};
const UDelete = async (id) => {
    return await UserModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
const UChangePassword = async (req) => {
    const userId = req.user._id;
    if (!userId) {
        throw createHttpError(401, "Unauthorized");
    }
    const { oldPass, newPass } = req.body;
    const user = await UserModel.findById(userId);
    const isPassMatched = await bcrypt.compare(oldPass, user?.password);
    if (!isPassMatched) {
        throw createHttpError(400, "Password didn't matched");
    }
    const hashedPass = await bcrypt.hash(newPass, 10);
    return await UserModel.findByIdAndUpdate(userId, { password: hashedPass, isPasswordChanged: true }, { new: true });
};
const USendForgetPassCode = async (email) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    await VerifyCode.deleteMany({ email });
    const code = Math.floor(100000 + Math.random() * 900000);
    const verifyCode = await VerifyCode.create({ email, verificationCode: code });
    if (!verifyCode) {
        throw createHttpError(400, "Failed to generate verification code");
    }
    await sendMail(email, "Your password reset code", `${code}`);
    return {
        success: true,
        message: "Verification code sent successfully",
    };
};
const UForgetPassword = async (email, verificationCode, newPass) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    const codeDoc = await VerifyCode.findOne({ email, verificationCode });
    if (!codeDoc) {
        throw createHttpError(400, "Invalid or expired verification code");
    }
    const hashedPass = await bcrypt.hash(newPass, 10);
    user.password = hashedPass;
    user.isPasswordChanged = true;
    await user.save();
    await VerifyCode.deleteOne({ email, verificationCode });
    return {
        success: true,
        message: "Password reset successfully",
    };
};
export const SUser = {
    USendCode,
    ULogin,
    UProfile,
    UUpdateUser,
    UDelete,
    UVerifyCode,
    UChangePassword,
    UForgetPassword,
    USendForgetPassCode,
};
//# sourceMappingURL=user.service.js.map
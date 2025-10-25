import { AService } from "./admin.service.js";
import createHttpError from "http-errors";
import { sendMail } from "../../../utils/sendMail.js";
import { UserModel } from "../user/user.model.js";
import { Mentor } from "../mentor/mentor.model.js";
import { Student } from "../student/student.model.js";
export const createAdmin = async (req, res, next) => {
    try {
        const user = await AService.ACreate(req.body);
        if (!user) {
            return next(createHttpError(400, "Account Creation Failed"));
        }
        res.status(201).json({
            success: true,
            message: "Admin creation request successfull",
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMentors = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const skip = (page - 1) * limit;
        const filter = {
            mentorStatus: "yes",
            name: { $regex: search, $options: "i" },
            isBlocked: false,
            isDeleted: false,
        };
        const mentors = await UserModel.find(filter).skip(skip).limit(limit).lean();
        const total = await UserModel.countDocuments(filter);
        res.status(200).json({
            success: true,
            message: "Mentors fetched successfully",
            mentors,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getStudents = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const skip = (page - 1) * limit;
        const filter = {
            role: "student",
            name: { $regex: search, $options: "i" },
            isBlocked: false,
            isDeleted: false,
        };
        const students = await UserModel.find(filter)
            .skip(skip)
            .limit(limit)
            .lean();
        const total = await UserModel.countDocuments(filter);
        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            students,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    }
    catch (error) {
        next(error);
    }
};
export const requestedMentors = async (req, res, next) => {
    const result = await Mentor.find({ mentorStatus: "pending", role: "mentor" });
    if (result.length === 0) {
        return next(createHttpError(404, "No requests yet"));
    }
    const count = await Mentor.countDocuments({ mentorStatus: "pending" });
    res.status(200).json({
        success: true,
        message: "Requested admin fetched successfully",
        requests: result,
        count,
    });
};
export const approveMentor = async (req, res, next) => {
    try {
        const approveMentor = await Mentor.findByIdAndUpdate(req.params.id, { mentorStatus: "yes" }, { new: true });
        if (!approveMentor) {
            return next(createHttpError(400, "Mentor not found"));
        }
        res.status(200).json({ message: "Mentor request Approved" });
        await sendMail(approveMentor.email, "Mentor Request Approved", ``);
    }
    catch (error) {
        next(error);
    }
};
export const rejectMentor = async (req, res, next) => {
    try {
        const rejectedMentor = await Mentor.findByIdAndUpdate(req.params.id, { mentorStatus: "rejected" }, { new: true });
        if (!rejectedMentor) {
            return next(createHttpError(400, "Mentor not found"));
        }
        res.status(200).json({ message: "Mentor request Rejected" });
        await sendMail(rejectedMentor.email, "Mentor Request Rejected", ``);
    }
    catch (error) {
        next(error);
    }
};
export const getRejectedMentors = async (req, res, next) => {
    const result = await UserModel.find({
        mentorStatus: "rejected",
        role: "mentor",
    });
    if (result.length === 0) {
        return next(createHttpError(404, "No mentor requested rejected yet"));
    }
    res.status(200).json({
        success: true,
        message: "Rejected mentors fetched successfully",
        mentors: result,
    });
};
export const blockUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AService.ABlock(id, next);
        res.status(200).json({ success: true, message: "User blocked", user });
    }
    catch (error) {
        next(error);
    }
};
export const unBlockUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AService.AUnBlock(id, next);
        res.status(200).json({ success: true, message: "User unblocked", user });
    }
    catch (error) {
        next(error);
    }
};
export const getBlockedAccounts = async (req, res, next) => {
    const blockedAccounts = await UserModel.find({ isBlocked: true });
    if (blockedAccounts.length === 0) {
        return next(createHttpError(404, "No user is blocked yet"));
    }
    res.status(200).json({
        success: true,
        message: "Blocked accounts fetched successfully",
        blockedAccounts,
    });
};
export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AService.ADelete(id, next);
        res.status(200).json({ success: true, message: "User deleted", user });
    }
    catch (error) {
        next(error);
    }
};
export const undoDeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AService.AUndoDelete(id, next);
        res
            .status(200)
            .json({ success: true, message: "User deletion cancelled", user });
    }
    catch (error) {
        next(error);
    }
};
export const getDeletedAccount = async (req, res, next) => {
    const deletedAccounts = await UserModel.find({ isDeleted: true });
    if (deletedAccounts.length === 0) {
        return next(createHttpError(404, "No user is deleted yet"));
    }
    res.status(200).json({
        success: true,
        message: "Deleted accounts fetched successfully",
        deletedAccounts,
    });
};
//# sourceMappingURL=admin.controller.js.map
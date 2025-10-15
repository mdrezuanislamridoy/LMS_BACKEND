import createHttpError from "http-errors";
import { Enrollment } from "./enrollment.model.js";
import { Coupon } from "../coupon/coupon.model.js";
import { UserModel } from "../auth/user/user.model.js";
import { CourseModel } from "../course/course.model.js";
const SEnroll = async (req) => {
    const userId = req.user._id;
    const courseId = req.params.id;
    const user = await UserModel.findById(userId);
    if (user?.role !== "student") {
        throw createHttpError(403, "You cannot enroll course");
    }
    const course = await CourseModel.findById(courseId).populate("couponCodes");
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    const { couponCode } = req.body;
    let discount = 0;
    let discountType = "percentage";
    let totalAmount = course.price;
    if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode.code });
        if (!coupon)
            throw createHttpError(400, "Invalid coupon");
        if (!coupon.isActive || new Date(coupon.expiresIn) < new Date()) {
            throw createHttpError(400, "Coupon expired or inactive");
        }
        if (coupon.minSpend && course.price < coupon.minSpend) {
            throw createHttpError(400, `Minimum spend for this coupon is ${coupon.minSpend}`);
        }
        discountType = coupon.discountType;
        if (!coupon.courses.some((id) => id.toString() === courseId)) {
            throw createHttpError(400, "Coupon not valid for this course");
        }
        if (discountType === "percentage") {
            discount = course.price * (coupon.discount / 100);
        }
        else {
            discount = coupon.discount;
        }
        totalAmount -= discount;
    }
    const enrollment = await Enrollment.create({
        ...req.body,
        user: userId,
        courseId,
        discounted: discount,
        discountType,
        totalAmount,
        status: "pending",
    });
    if (!enrollment) {
        throw createHttpError(400, "Failed to enroll course");
    }
    return {
        success: true,
        message: "Enrollment pending, kindly pay for confirmation",
        enrollment,
    };
};
const SGetMyEnrollments = async (req) => {
    return await Enrollment.find({ user: req.userId })
        .populate("courseId")
        .populate("progress.finishedVideos")
        .populate("progress.finishedModules");
};
const SUpdateEnrollmentStatus = async (req) => {
    const status = req.body.status;
    if (!["paid", "pending", "cancelled"].includes(status)) {
        throw createHttpError(400, "Invalid status value");
    }
    return await Enrollment.findByIdAndUpdate(req.params.id, { status }, { new: true });
};
const SUpdateVideoProgress = async (req) => {
    const { videoId } = req.body;
    const courseId = req.params.id;
    const userId = req.user._id;
    const enrollment = await Enrollment.findOne({ user: userId, courseId });
    if (!enrollment)
        throw createHttpError(404, "Enrollment not found");
    if (!enrollment?.progress.finishedVideos.includes(videoId)) {
        enrollment?.progress.finishedVideos.push(videoId);
    }
    enrollment.progress.lastAccessedVideo = videoId;
    enrollment.progress.percentage =
        enrollment?.progress.totalVideos === 0
            ? 0
            : (enrollment.progress.finishedVideos.length /
                enrollment.progress.totalVideos) *
                100;
    await enrollment.save();
    return {
        success: true,
        message: "Progress updated successfully",
        progress: enrollment.progress,
    };
};
export const SEnrollment = {
    SEnroll,
    SGetMyEnrollments,
    SUpdateEnrollmentStatus,
    SUpdateVideoProgress,
};
//# sourceMappingURL=enrollment.service.js.map
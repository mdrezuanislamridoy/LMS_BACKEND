import { SEnrollment } from "./enrollment.service.js";
import createHttpError from "http-errors";
export const Enroll = async (req, res, next) => {
    try {
        const result = await SEnrollment.SEnroll(req);
        if (!result) {
            return next(createHttpError(400, "Order Creation Failed"));
        }
        return res.status(201).json({
            message: result.message ||
                "Enrollment requested submitted. Please pay for confirmation",
            enrollment: result.enrollment,
            redirectUrl: `/payment/payBill/${result.enrollment._id}`,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getMyEnrollments = async (req, res, next) => {
    try {
        const myEnrollments = await SEnrollment.SGetMyEnrollments(req);
        if (!myEnrollments) {
            return next(createHttpError(404, "No enrollment found"));
        }
        res
            .status(200)
            .json({ message: "Enrollment fetched successfully", myEnrollments });
    }
    catch (error) {
        next(error);
    }
};
export const updateEnrollmentStatus = async (req, res, next) => {
    try {
        const updatedOrder = await SEnrollment.SUpdateEnrollmentStatus(req, req.body.status);
        if (!updatedOrder) {
            return next(createHttpError(400, "Order Updation failed"));
        }
        res
            .status(200)
            .json({ message: "Order Updated Successfully", updatedOrder });
    }
    catch (error) {
        next(error);
    }
};
export const updateVideoProgress = async (req, res, next) => {
    try {
        const result = await SEnrollment.SUpdateVideoProgress(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=enrollment.controller.js.map
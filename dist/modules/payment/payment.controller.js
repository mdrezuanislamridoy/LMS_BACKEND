import { SPayment } from "./payment.service.js";
import createHttpError from "http-errors";
import { Enrollment } from "../enrollment/enrollment.model.js";
export const payBill = async (req, res, next) => {
    try {
        const bill = await SPayment.SPayBill(req);
        if (!bill) {
            return next(createHttpError(400, "Payment failed"));
        }
        return res.status(200).json(bill);
    }
    catch (error) {
        next(error);
    }
};
export const success = async (req, res, next) => {
    try {
        const enrollmentId = req.params.id;
        const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, {
            status: "paid",
        }, { new: true });
        if (!enrollment) {
            return next(createHttpError(400, "enrollment updation failed"));
        }
        res
            .status(200)
            .json({ message: "enrollment Completed Successfully", enrollment });
    }
    catch (error) {
        next(error);
    }
};
export const failed = async (req, res, next) => {
    try {
        const enrollmentId = req.params.id;
        const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, {
            paymentStatus: "failed",
            status: "pending",
        }, { new: true });
        if (!enrollment) {
            return next(createHttpError(400, "enrollment updation failed"));
        }
        res.status(200).json({ message: "Payment Failed", enrollment });
    }
    catch (error) {
        next(error);
    }
};
export const canceled = async (req, res, next) => {
    try {
        const enrollmentId = req.params.id;
        const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, {
            paymentStatus: "unpaid",
            status: "pending",
        }, { new: true });
        if (!enrollment) {
            return next(createHttpError(400, "enrollment updation failed"));
        }
        res.status(200).json({ message: "Payment Canceled", enrollment });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=payment.controller.js.map
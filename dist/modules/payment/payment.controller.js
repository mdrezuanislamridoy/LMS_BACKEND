import createHttpError from "http-errors";
import { SPayment } from "./payment.service.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
export const payBill = async (req, res, next) => {
    try {
        const bill = await SPayment.SPayBill(req);
        if (!bill) {
            return next(createHttpError(400, "Payment initiation failed"));
        }
        res.status(200).json(bill);
    }
    catch (error) {
        next(error);
    }
};
export const success = async (req, res, next) => {
    try {
        const enrollment = await SPayment.SSuccess(req);
        return res.status(200).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};
export const failed = async (req, res, next) => {
    try {
        const enrollment = await SPayment.SFail(req);
        return res.status(200).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};
export const canceled = async (req, res, next) => {
    try {
        const enrollment = await SPayment.SCancel(req);
        return res.status(200).json(enrollment);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=payment.controller.js.map
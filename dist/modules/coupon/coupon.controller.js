import { SCoupon } from "./coupon.service.js";
import { Coupon } from "./coupon.model.js";
export const getCoupon = async (req, res, next) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json({
            success: true,
            message: "Coupon fetched successfully",
            coupons
        });
    }
    catch (error) {
        next(error);
    }
};
export const addCoupon = async (req, res, next) => {
    try {
        const result = await SCoupon.SCreateCoupon(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const updateCoupon = async (req, res, next) => {
    try {
        const result = await SCoupon.SUpdateCoupon(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCoupon = async (req, res, next) => {
    try {
        const result = await SCoupon.SDeleteCoupon(req);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=coupon.controller.js.map
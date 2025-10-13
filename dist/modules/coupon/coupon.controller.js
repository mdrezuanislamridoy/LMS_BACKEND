import { SCoupon } from "./coupon.service.js";
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
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCoupon = async (req, res, next) => {
    try {
        const result = await SCoupon.SDeleteCoupon(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=coupon.controller.js.map
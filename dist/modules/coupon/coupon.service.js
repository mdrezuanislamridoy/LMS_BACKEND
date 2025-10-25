import { Coupon } from "./coupon.model.js";
import createHttpError from "http-errors";
const SCreateCoupon = async (req) => {
    const coupon = await Coupon.create(req.body);
    if (!coupon) {
        throw createHttpError(400, "Coupon creation failed");
    }
    return {
        success: true,
        message: "Coupon created successfully",
        coupon,
    };
};
const SUpdateCoupon = async (req) => {
    const couponId = req.params.id;
    if (!couponId)
        throw createHttpError(400, "Coupon ID is required");
    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, req.body, {
        new: true,
    });
    if (!updatedCoupon) {
        throw createHttpError(404, "Coupon not found or update failed");
    }
    return {
        success: true,
        message: "Coupon updated successfully",
        coupon: updatedCoupon,
    };
};
const SDeleteCoupon = async (req) => {
    const couponId = req.params.id;
    if (!couponId)
        throw createHttpError(400, "Coupon ID is required");
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
    if (!deletedCoupon) {
        throw createHttpError(404, "Coupon not found or deletion failed");
    }
    return {
        success: true,
        message: "Coupon deleted successfully",
    };
};
export const SCoupon = {
    SCreateCoupon,
    SUpdateCoupon,
    SDeleteCoupon,
};
//# sourceMappingURL=coupon.service.js.map
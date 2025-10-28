import createHttpError from "http-errors";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { env } from "../../config/env.js";
import SSLCOMMERZ from "sslcommerz-lts";
export const SPayBill = async (req) => {
    try {
        const userId = req.user?._id;
        if (!userId)
            throw createHttpError(401, "Unauthorized");
        const enrollmentId = req.params.id;
        const enrollment = await Enrollment.findOne({
            _id: enrollmentId,
            user: userId,
        }).populate("user courseId");
        if (!enrollment)
            throw createHttpError(404, "Enrollment not found");
        const transactionId = `tnx_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 5)}`;
        const store_id = env.sslc_store_id;
        const store_passwd = env.sslc_store_pass;
        const is_live = env.is_live === true;
        if (!store_id || !store_passwd) {
            throw createHttpError(500, "SSLCommerz credentials missing");
        }
        const data = {
            total_amount: String(enrollment.totalAmount.toFixed(2)),
            currency: "BDT",
            tran_id: transactionId,
            success_url: `${env.origin}/payment/success/${enrollmentId}`,
            fail_url: `${env.origin}/payment/fail/${enrollmentId}`,
            cancel_url: `${env.origin}/payment/cancelled/${enrollmentId}`,
            ipn_url: `${env.origin}/api/ipn`,
            shipping_method: "NO",
            product_name: enrollment.courseId?.title || "Course Enrollment",
            product_category: "Education",
            product_profile: "non-physical-goods",
            cus_name: enrollment.user.name,
            cus_email: enrollment.user.email,
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: enrollment.phone || "01700000000",
        };
        console.log("SSLCommerz Init Data:", data); // DEBUG
        const sslcz = new SSLCOMMERZ(store_id, store_passwd, is_live);
        const initResponse = await sslcz.init(data).catch((sdkError) => {
            console.error("SSLCommerz SDK Error:", sdkError);
            throw createHttpError(502, `SSLCommerz SDK Error: ${sdkError.message}`);
        });
        console.log("SSLCommerz Response:", initResponse); // DEBUG
        if (initResponse?.GatewayPageURL) {
            enrollment.transactionId = transactionId;
            await enrollment.save();
            return {
                url: initResponse.GatewayPageURL,
                tran_id: transactionId,
                message: "Redirecting to payment...",
            };
        }
        else {
            console.error("No GatewayPageURL:", initResponse);
            throw createHttpError(502, "Payment gateway not responding");
        }
    }
    catch (error) {
        console.error("SPayBill ERROR:", {
            message: error.message,
            name: error.name,
            stack: error.stack?.split("\n").slice(0, 5),
            isHttpError: error.isHttpError,
        });
        return {
            success: false,
            message: error.message || "Payment failed",
        };
    }
};
export const SPayment = {
    SPayBill,
};
//# sourceMappingURL=payment.service.js.map
import createHttpError from "http-errors";
import { configDotenv } from "dotenv";
import axios from "axios";
import { Enrollment } from "../enrollment/enrollment.model.js";
configDotenv();
const SPayBill = async (req) => {
    const userId = req.userId;
    const enrollmentId = req.params.id;
    const enrollment = await Enrollment.findOne({
        _id: enrollmentId,
        user: userId,
    });
    if (!enrollment) {
        throw createHttpError(404, "Enrollment not found");
    }
    const transactionId = "tnx_" + Date.now();
    const data = {
        store_id: process.env.SSLC_STORE_ID,
        store_passwd: process.env.SSLC_STORE_PASS,
        total_amount: enrollment.totalAmount,
        currency: "USD",
        tran_id: transactionId,
        success_url: `http://localhost:5050/api/payment/success/${enrollmentId}`,
        fail_url: `http://localhost:5050/api/payment/fail/${enrollment}`,
        cancel_url: `http://localhost:5050/api/payment/cancelled/${enrollment}`,
        cus_name: enrollment.user.name,
        cus_email: enrollment.user.email,
        cus_phone: enrollment.phone,
    };
    const SSLCommerz_API = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
    const response = await axios.post(SSLCommerz_API, data);
    enrollment.transactionId = transactionId;
    enrollment.save();
    return {
        url: response.data.GatewayPageURL,
        message: "Verify your payment",
        enrollment,
    };
};
export const SPayment = {
    SPayBill,
};
//# sourceMappingURL=payment.service.js.map
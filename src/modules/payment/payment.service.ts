import type { Request } from "express";
import createHttpError from "http-errors";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { env } from "../../config/env.js";
import SSLCOMMERZ from "sslcommerz-lts";

export const SPayBill = async (req: Request) => {
  try {
    const userId = req.user?._id;
    if (!userId) throw createHttpError(401, "Unauthorized");

    const enrollmentId = req.params.id;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      user: userId,
    }).populate<{
      user: { name: string; email: string };
      courseId: { title: string };
    }>("user courseId");

    if (!enrollment) throw createHttpError(404, "Enrollment not found");

    const transactionId = "tnx_" + Date.now();

    const store_id = env.sslc_store_id;
    const store_passwd = env.sslc_store_pass;
    const is_live = env.is_live;

    const data = {
      store_id,
      store_passwd,
      total_amount: enrollment.totalAmount.toFixed(2),
      currency: "USD",
      tran_id: transactionId,
      success_url: `${env.origin}/payment/success/${enrollmentId}`,
      fail_url: `${env.origin}/payment/fail/${enrollmentId}`,
      cancel_url: `${env.origin}/payment/cancelled/${enrollmentId}`,
      ipn_url: `${env.origin}/api/ipn`,
      shipping_method: "NO",
      cus_name: enrollment.user.name,
      cus_email: enrollment.user.email,
      cus_phone: enrollment.phone || "01700000000",
      product_name: enrollment.courseId?.title || "Course Enrollment",
    };

    const sslcz = new SSLCOMMERZ(store_id!, store_passwd!, is_live);

    const initResponse = await sslcz.init(data);

    if (initResponse?.GatewayPageURL) {
      enrollment.transactionId = transactionId;
      await enrollment.save();

      return {
        url: initResponse.GatewayPageURL,
        tran_id: transactionId,
        message: "Verify your payment",
        enrollment,
        transactionId,
      };
    } else {
      console.error("SSLCommerz init failed:", initResponse);
      await Enrollment.findByIdAndDelete(req.params.id as string);

      return {
        success: false,
        message: "Payment failed",
      };
    }
  } catch (error: any) {
    console.error("Checkout error:", error);
    await Enrollment.findByIdAndDelete(req.params.id as string);
    return {
      success: false,
      message: "Payment failed",
    };
  }
};

export const SPayment = {
  SPayBill,
};

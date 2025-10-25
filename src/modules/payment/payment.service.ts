import type { Request } from "express";
import createHttpError from "http-errors";
import axios from "axios";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { env } from "../../config/env.js";

export const SPayBill = async (req: Request) => {
  const userId = req.user._id;
  const enrollmentId = req.params.id;

  const enrollment = await Enrollment.findOne({
    _id: enrollmentId,
    user: userId,
  }).populate<{ user: { name: string; email: string } }>("user");

  if (!enrollment) throw createHttpError(404, "Enrollment not found");

  const transactionId = "tnx_" + Date.now();

  const data = {
    store_id: env.sslc_store_id,
    store_passwd: env.sslc_store_pass,
    total_amount: enrollment.totalAmount,
    currency: "USD",
    tran_id: transactionId,
    success_url: `${process.env.CLIENT_URL}/payment/success/${enrollmentId}`,
    fail_url: `${process.env.CLIENT_URL}/payment/fail/${enrollmentId}`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled/${enrollmentId}`,
    cus_name: enrollment.user.name,
    cus_email: enrollment.user.email,
    cus_phone: enrollment.phone || "01700000000",
    product_name: enrollment.courseId?.title || "Course Enrollment",
  };

  const SSLCommerz_API = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
  const response = await axios.post<{ GatewayPageURL: string }>(
    SSLCommerz_API,
    data
  );

  enrollment.transactionId = transactionId;
  await enrollment.save();

  return {
    url: response.data.GatewayPageURL,
    message: "Verify your payment",
    enrollment,
  };
};

export const SPayment = {
  SPayBill,
};

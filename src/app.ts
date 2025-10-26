import express, { type Application } from "express";

import { CategoryRouter } from "./modules/categories/category.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { HandleError } from "./middlewares/handleError.js";

import { userRouter } from "./modules/auth/user/user.routes.js";
import { EnrollmentRouter } from "./modules/enrollment/enrollment.routes.js";
import { mentorRouter } from "./modules/auth/mentor/mentor.routes.js";
import { adminRouter } from "./modules/auth/admin/admin.routes.js";
import { CourseRoutes } from "./modules/course/course.routes.js";
import { PaymentRouter } from "./modules/payment/payment.routes.js";
import { VideoRouter } from "./modules/enrolled/video/video.routes.js";
import { MeetingRouter } from "./modules/meeting/meeting.routes.js";
import { AssignmentRouter } from "./modules/enrolled/assignment/assignment.routes.js";
import { quizRouter } from "./modules/enrolled/quiz/quiz.routes.js";
import { CouponRouter } from "./modules/coupon/coupon.routes.js";
import { CartRouter } from "./modules/cart/cart.routes.js";
import { ReviewRouter } from "./modules/enrolled/review/review.routes.js";
configDotenv();

const app: Application = express();

// middlewires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Routing
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/enrollment", EnrollmentRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/coupon", CouponRouter);
app.use("/api/cart", CartRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/course", CourseRoutes);
app.use("/api/payment", PaymentRouter);
app.use("/api/video", VideoRouter);
app.use("/api/meeting", MeetingRouter);
app.use("/api/assignment", AssignmentRouter);
app.use("/api/quiz", quizRouter);

// global error
app.use(HandleError);

export default app;

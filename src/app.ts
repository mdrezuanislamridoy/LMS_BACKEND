import express, { type Application } from "express";

import { CategoryRouter } from "./modules/categories/category.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { HandleError } from "./middlewares/handleError.js";
import { ReviewRouter } from "./modules/review/review.routes.js";
import { userRouter } from "./modules/auth/user/user.routes.js";
import { EnrollmentRouter } from "./modules/enrollment/enrollment.routes.js";
import { mentorRouter } from "./modules/auth/mentor/mentor.routes.js";
import { adminRouter } from "./modules/auth/admin/admin.routes.js";
import { CourseRoutes } from "./modules/course/course.routes.js";
import { PaymentRouter } from "./modules/payment/payment.routes.js";
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
app.use("/api/mentor", mentorRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/course", CourseRoutes);
app.use("/api/payment", PaymentRouter);

// global error
app.use(HandleError);

export default app;

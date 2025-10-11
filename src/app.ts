import express, { type Application } from "express";

import { CategoryRouter } from "./modules/categories/category.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { HandleError } from "./middlewares/handleError.js";
import { ReviewRouter } from "./modules/review/review.routes.js";
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
app.use("/api/auth", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", CartRouter);
app.use("/api/review", ReviewRouter);
app.use("/api/order", OrderRouter);
app.use("/api/payment", PaymentRouter);

// global error
app.use(HandleError);

export default app;

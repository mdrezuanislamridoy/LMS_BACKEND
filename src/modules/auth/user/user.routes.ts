import { Router } from "express";
import { login, profile } from "./user.controller.js";
import { studentRoutes } from "../student/student.routes.js";
import { adminRouter } from "../admin/admin.routes.js";
import { mentorRouter } from "../mentor/mentor.routes.js";
import { User } from "../../../middlewares/user.middleware.js";

const router = Router();

router.post("/login", login);
router.get("/profile", User, profile);

router.use("/", studentRoutes);
router.use("/", adminRouter);
router.use("/", mentorRouter);

export const userRouter = router;

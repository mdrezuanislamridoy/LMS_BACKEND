import { Router } from "express";
import { login, profile } from "./user.controller.js";
import { User } from "../../middlewares/User.js";
import { studentRoutes } from "./student/student.routes.js";
import { adminRoutes } from "./admin/admin.routes.js";
import { mentorRouter } from "./mentor/mentor.routes.js";

const router = Router();

router.post("/login", login);
router.get("/profile", User, profile);

router.use("/", studentRoutes);
router.use("/", adminRoutes);
router.use("/", mentorRouter);

export const userRouter = router;

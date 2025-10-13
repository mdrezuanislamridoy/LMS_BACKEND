import { Router } from "express";
import { createStudent, updateStudent } from "./student.controller.js";
import { User } from "../../../middlewares/user.middleware.js";
import { checkRole } from "../../../middlewares/role.middleware.js";

const router = Router();

router.post("/register", createStudent);
router.post("/updateStudent", User, checkRole("student"), updateStudent);

export const studentRoutes = router;

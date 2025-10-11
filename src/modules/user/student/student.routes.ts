import { Router } from "express";
import { createStudent } from "./student.controller.js";

const router = Router();

router.post("/register", createStudent);

export const studentRoutes = router;

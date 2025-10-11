import { Router } from "express";
import { createAdmin } from "./admin.controller.js";

const router = Router();

router.post("/register", createAdmin);

export const adminRoutes = router;

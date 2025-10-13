import { Router } from "express";
import { createMentor } from "./mentor.controller.js";
const router = Router();
router.post("/register", createMentor);
export const mentorRouter = router;
//# sourceMappingURL=mentor.routes.js.map
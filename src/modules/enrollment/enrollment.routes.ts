import { Router } from "express";

import { EnrollmentSchema } from "./enrollment.validator.js";
import { User } from "../../middlewares/user.middleware.js";
import { validation } from "../../middlewares/Validator.js";
const router = Router();

router.post("/enroll/:id", User, validation(EnrollmentSchema));
export const EnrollmentRouter = router;

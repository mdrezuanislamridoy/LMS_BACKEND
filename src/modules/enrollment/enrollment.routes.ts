import { Router } from "express";

import { validation } from "../../../../middlewares/Validator.js";
import { Mentor } from "../../../../middlewares/Mentor.js";
import { User } from "../../../../middlewares/User.js";
import { EnrollmentSchema } from "./enrollment.validator.js";
const router = Router();

router.post("/enroll/:id",User,validation(EnrollmentSchema),)
export const EnrollmentRouter = router;

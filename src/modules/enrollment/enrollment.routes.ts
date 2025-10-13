import { Router } from "express";

import { EnrollmentSchema } from "./enrollment.validator.js";
import { User } from "../../middlewares/user.middleware.js";
import { validation } from "../../middlewares/Validator.js";
import {
  Enroll,
  getMyEnrollments,
  updateEnrollmentStatus,
} from "./enrollment.controller.js";
import { checkRole } from "../../middlewares/role.middleware.js";
const router = Router();

router.post("/enroll/:id", User, validation(EnrollmentSchema), Enroll);
router.get("/getMyEnrollments", User, getMyEnrollments);
router.put(
  "/updateEnrollmentStatus/:id",
  User,
  checkRole("admin"),
  updateEnrollmentStatus
);

export const EnrollmentRouter = router;

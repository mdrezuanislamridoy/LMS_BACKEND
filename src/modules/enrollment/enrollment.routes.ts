import { Router } from "express";

import {
  VEnrollmentSchema,
  VUpdateEnrollmentSchema,
} from "./enrollment.validator.js";
import { User } from "../../middlewares/user.middleware.js";
import { validation } from "../../middlewares/Validator.js";
import {
  Enroll,
  getMyEnrollments,
  updateEnrollmentStatus,
} from "./enrollment.controller.js";
import { checkRole } from "../../middlewares/role.middleware.js";
const router = Router();

router.post("/enroll/:id", User, validation(VEnrollmentSchema), Enroll);
router.get("/getMyEnrollments", User, getMyEnrollments);
router.put(
  "/updateEnrollmentStatus/:id",
  User,
  checkRole("admin"),
  validation(VUpdateEnrollmentSchema),
  updateEnrollmentStatus
);

export const EnrollmentRouter = router;

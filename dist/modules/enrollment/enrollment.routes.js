import { Router } from "express";
import { Enroll, getMyEnrollments, getSingleEnrollment, updateEnrollmentStatus, } from "./enrollment.controller.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { User } from "../../middlewares/user.middleware.js";
const router = Router();
router.post("/enroll/:id", User, Enroll);
router.get("/getMyEnrollments", User, getMyEnrollments);
router.get("/getSingleEnrollment/:id", User, getSingleEnrollment);
router.put("/updateEnrollmentStatus/:id", User, checkRole("admin"), updateEnrollmentStatus);
export const EnrollmentRouter = router;
//# sourceMappingURL=enrollment.routes.js.map
import { Router } from "express";
import {
  addAssignment,
  deleteAssignment,
  getAssignment,
  updateAssignment,
} from "./assignment.controller.js";
import { checkRole } from "../../../middlewares/role.middleware.js";
import { User } from "../../../middlewares/user.middleware.js";
const router = Router();

router.post(
  "/addAssignment/:id",
  User,
  checkRole("admin", "mentor"),
  addAssignment
);
router.get(
  "/getAssignment/:id",
  User,
  checkRole("admin", "mentor"),
  getAssignment
);
router.put(
  "/updateAssignment/:id",
  User,
  checkRole("admin", "mentor"),
  updateAssignment
);
router.delete(
  "/deleteAssignment/:id",
  User,
  checkRole("admin", "mentor"),
  deleteAssignment
);
router.put(
  "/submitAssignment/:id",
  User,
  checkRole("student"),
  updateAssignment
);

router.get(
  "/getMyCompletedAssignments",
  User,
  checkRole("student"),
  getAssignment
);
router.put(
  "/setMarks/:id",
  User,
  checkRole("admin", "mentor"),
  updateAssignment
);

export const AssignmentRouter = router;

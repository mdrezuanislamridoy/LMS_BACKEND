import { Router } from "express";
import { User } from "../../../middlewares/user.middleware.js";
import { checkRole } from "../../../middlewares/role.middleware.js";
import {
  approveMentor,
  blockUser,
  createAdmin,
  deleteUser,
  getBlockedAccounts,
  getDeletedAccount,
  getRejectedMentors,
  rejectMentor,
  unBlockUser,
  undoDeleteUser,
  requestedMentors,
  getMentors,
  getStudents,
} from "./admin.controller.js";

const router = Router();

router.post("/register", createAdmin);
router.get("/mentors", User, checkRole("admin"), getMentors);
router.get("/students", User, checkRole("admin"), getStudents);
router.get("/requestedMentors", User, checkRole("admin"), requestedMentors);
router.put("/approveMentor/:id", User, checkRole("admin"), approveMentor);
router.put("/rejectMentor/:id", User, checkRole("admin"), rejectMentor);
router.get("/rejectedMentors", User, checkRole("admin"), getRejectedMentors);
router.put("/block/:id", User, checkRole("admin"), blockUser);
router.put("/unblock/:id", User, checkRole("admin"), unBlockUser);
router.get("/blockedAccount", User, checkRole("admin"), getBlockedAccounts);

router.put("/delete/:id", User, checkRole("admin"), deleteUser);
router.put("/undodelete/:id", User, checkRole("admin"), undoDeleteUser);

router.get("/getDeletedAccounts", User, checkRole("admin"), getDeletedAccount);

export const adminRouter = router;

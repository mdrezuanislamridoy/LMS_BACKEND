import { Router } from "express";
import {
  createMeeting,
  deleteMeeting,
  getMeeting,
  getMeetings,
  updateMeeting,
} from "./meeting.controller.js";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { validation } from "../../middlewares/Validator.js";
import { VMeetingSchema } from "./meeting.validator.js";
const router = Router();

router.post(
  "/createMeeting/:courseId",
  User,
  checkRole("admin", "mentor"),
  validation(VMeetingSchema),
  createMeeting
);
router.get(
  "/getMeeting/:meetingId",
  User,
  checkRole("admin", "mentor"),
  getMeeting
);
router.get(
  "/getMeetings/:courseId",
  User,
  checkRole("admin", "mentor"),
  getMeetings
);

router.put(
  "/updateMeeting/:meetingId",
  User,
  checkRole("admin", "mentor"),
  updateMeeting
);

router.delete(
  "/deleteMeeting/:meetingId",
  User,
  checkRole("admin", "mentor"),
  deleteMeeting
);

export const MeetingRouter = router;

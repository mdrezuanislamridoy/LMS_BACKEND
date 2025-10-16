import { Router } from "express";
import { User } from "../../../middlewares/user.middleware.js";
import { checkRole } from "../../../middlewares/role.middleware.js";
import {
  approveMentor,
  blockUser,
  createAdmin,
  deleteUser,
  rejectMentor,
  unBlockUser,
  undoDeleteUser,
} from "./admin.controller.js";

const router = Router();

router.post("/register", createAdmin);
router.put("/approveMentor/:id", User, checkRole("admin"), approveMentor);
router.put("/rejectMentor/:id", User, checkRole("admin"), rejectMentor);
router.put("/block/:id", User, checkRole("admin"), blockUser);
router.put("/unblock/:id", User, checkRole("admin"), unBlockUser);
router.put("/delete/:id", User, checkRole("admin"), deleteUser);
router.put("/undodelete/:id", User, checkRole("admin"), undoDeleteUser);

export const adminRouter = router;

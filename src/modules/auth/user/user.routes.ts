import { Router } from "express";
import {
  changePassword,
  forgetPassword,
  login,
  logout,
  profile,
  sendForgetPassCode,
  sendVerificationCode,
  updateUser,
  verifyCode,
} from "./user.controller.js";
import { studentRoutes } from "../student/student.routes.js";
import { adminRouter } from "../admin/admin.routes.js";
import { mentorRouter } from "../mentor/mentor.routes.js";
import { User } from "../../../middlewares/user.middleware.js";

const router = Router();

router.post("/sendSignUpCode", sendVerificationCode);
router.post("/verifySignUpCode", verifyCode);
router.post("/login", login);
router.get("/profile", User, profile);
router.put("/updateProfile", User, updateUser);
router.put("/changePassword", User, changePassword);
router.post("/sendForgetPasswordCode", sendForgetPassCode),
  router.post("/forgetPassCode", forgetPassword);
router.post("/logout", User, logout);

router.use("/", studentRoutes);
router.use("/", adminRouter);
router.use("/", mentorRouter);

export const userRouter = router;

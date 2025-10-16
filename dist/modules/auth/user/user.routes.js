import { Router } from "express";
import { changePassword, deleteUser, forgetPassword, login, logout, profile, sendForgetPassCode, sendVerificationCode, updateUser, verifyCode, } from "./user.controller.js";
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
router.put("/deleteUser", User, deleteUser);
router.put("/changePassword", User, changePassword);
router.post("/sendForgetPasswordCode", sendForgetPassCode),
    router.post("/forgetPassCode", forgetPassword);
router.post("/logout", User, logout);
router.use("/student", studentRoutes);
router.use("/admin", adminRouter);
router.use("/mentor", mentorRouter);
export const userRouter = router;
//# sourceMappingURL=user.routes.js.map
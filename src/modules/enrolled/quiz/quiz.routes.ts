import { Router } from "express";
import { addQuiz, deleteQuiz, getQuiz, updateQuiz } from "./quiz.controller.js";
import { User } from "../../../middlewares/user.middleware.js";
import { checkRole } from "../../../middlewares/role.middleware.js";

const router = Router();

router.post("/addQuiz/:courseId", User, checkRole("admin", "mentor"), addQuiz);
router.put(
  "/updateQuiz/:quizId",
  User,
  checkRole("admin", "mentor"),
  updateQuiz
);
router.delete(
  "/deleteQuiz/:quizId",
  User,
  checkRole("admin", "mentor"),
  deleteQuiz
);
router.get("/getQuiz/:moduleId", User, checkRole("admin", "mentor"), getQuiz);

export const quizRouter = router;

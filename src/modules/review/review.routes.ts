import { Router } from "express";
import { validation } from "../../middlewares/Validator.js";
import { VReviewSchema } from "./review.validator.js";
import { addReview, deleteReview, getReviews } from "./review.controller.js";
import { User } from "../../middlewares/user.middleware.js";

const router = Router();

router.post("/addReview/:courseId", User, validation(VReviewSchema), addReview);
router.get("/getReviews/:courseId", getReviews);
router.delete("/delete/:id", User, deleteReview);

export const ReviewRouter = router;

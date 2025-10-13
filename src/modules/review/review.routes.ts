import { Router } from "express";
import { isUser } from "../../middlewares/user.middleware.js";
import { validation } from "../../middlewares/Validator.js";
import { VReviewSchema } from "./review.validator.js";
import { addReview, deleteReview, getReviews } from "./review.controller.js";

const router = Router();

router.post(
  "/addReview/:productId",
  isUser,
  validation(VReviewSchema),
  addReview
);
router.get("/getReviews/:productId", getReviews);
router.delete("/delete/:id", isUser, deleteReview);

export const ReviewRouter = router;

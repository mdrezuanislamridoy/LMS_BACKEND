import { Router } from "express";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { addVideo } from "./video.controller.js";
import { upload } from "../../utils/multer.js";
import { validation } from "../../middlewares/Validator.js";
import { VVideoSchema } from "./video.validator.js";

const router = Router();

router.post(
  "/addVideo",
  User,
  checkRole("admin", "mentor"),
  validation(VVideoSchema),
  upload.single("thumbnail"),
  addVideo
);

export const VideoRouter = router;

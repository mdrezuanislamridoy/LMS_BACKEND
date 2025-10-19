import { Router } from "express";
import { addVideo } from "./video.controller.js";
import { VVideoSchema } from "./video.validator.js";
import { User } from "../../../middlewares/user.middleware.js";
import { checkRole } from "../../../middlewares/role.middleware.js";
import { validation } from "../../../middlewares/Validator.js";
import { upload } from "../../../utils/multer.js";

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

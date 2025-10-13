import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "./category.controller.js";
import { upload } from "../../utils/multer.js";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/addCategory",
  User,
  checkRole("admin"),
  upload.single("icon"),
  addCategory
);
router.get("/", getCategories);
router.delete("/delete/:id", User, checkRole("admin"), deleteCategory);

export const CategoryRouter = router;

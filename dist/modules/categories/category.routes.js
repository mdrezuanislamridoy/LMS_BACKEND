import { Router } from "express";
import { addCategory, deleteCategory, getCategories, } from "./category.controller.js";
import { Admin } from "../../../removed/Admin.js";
import { upload } from "../../utils/multer.js";
const router = Router();
router.post("/addCategory", Admin, upload.single("icon"), addCategory);
router.get("/", getCategories);
router.delete("/delete/:id", Admin, deleteCategory);
export const CategoryRouter = router;
//# sourceMappingURL=category.routes.js.map
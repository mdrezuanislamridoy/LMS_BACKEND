import { Router } from "express";
const router = Router();

import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "./product.controller.js";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";

router.post("/addProduct", User, checkRole("admin"), addProduct);
router.get("/getProducts", User, getProducts);
router.get("/getProduct/:id", User, getProduct);
router.delete("/deleteProduct/:id", User, checkRole("admin"), deleteProduct);

export const ProductRouter = router;

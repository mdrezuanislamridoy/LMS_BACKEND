import { Router } from "express";
import { User } from "../../middlewares/user.middleware.js";
import {
  addToCartProduct,
  getCartItems,
  removeCartItem,
} from "./cart.controller.js";

const router = Router();

router.post("/addToCart", User, addToCartProduct);
router.get("/getCartItems", User, getCartItems);
router.delete("/removeFromCart/:id", User, removeCartItem);

export const CartRouter = router;

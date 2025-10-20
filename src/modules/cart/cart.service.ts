import type { Request } from "express";
import { Cart } from "./cart.model.js";
import createHttpError from "http-errors";
import { Product } from "../digitalProducts/product.model.js";
import { create } from "domain";

const addToCart = async (req: Request) => {
  const userId = req.user._id;
  const { productId, qty } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, qty, price: product.price }],
      totalAmount: product.price * qty,
    });
  } else {
    cart.items.push({ product: productId, qty, price: product.price });
    cart.totalAmount += product.price * qty;
  }

  await cart.save();
  return {
    success: true,
    message: "Product added to cart successfully",
    cart,
  };
};

const getCartItem = async (req: Request) => {
  const userId = req.user._id;
  const items = await Cart.find({ user: userId });

  if (!items || items.length === 0) {
    throw createHttpError(400, "Cart items not found");
  }

  return {
    success: true,
    message: "Cart items fetched successfully",
    items,
  };
};

const removeItem = async (req: Request) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  // cart items in items[] then product and user in cart

  const deletedItem = await Cart.findOneAndDelete({
    user: userId,
    "items.product": productId,
  });

  if (!deletedItem) {
    throw createHttpError(400, "Cart item not found");
  }

  return {
    success: true,
    message: "Cart item removed successfully",
  };
};

export const CartService = { addToCart, getCartItem, removeItem };

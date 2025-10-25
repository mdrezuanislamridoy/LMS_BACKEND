import type { Request } from "express";
import createHttpError from "http-errors";
import { Cart } from "./cart.model.js";
import { Product } from "../digitalProducts/product.model.js";

const addToCart = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const { productId, qty } = req.body;
  if (!productId || !qty)
    throw createHttpError(400, "Product ID and quantity required");

  const product = await Product.findById(productId);
  if (!product) throw createHttpError(404, "Product not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, qty, price: product.price }],
      totalAmount: product.price * qty,
    });
  } else {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];
      if (existingItem) {
        existingItem.qty += qty;
      }
    } else {
      cart.items.push({ product: productId, qty, price: product.price });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  await cart.save();
  return {
    success: true,
    message: "Product added to cart successfully",
    cart,
  };
};


const getCartItem = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0)
    throw createHttpError(404, "Cart items not found");

  return {
    success: true,
    message: "Cart items fetched successfully",
    cart,
  };
};

const removeItem = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw createHttpError(401, "Unauthorized");

  const { productId } = req.body;
  if (!productId) throw createHttpError(400, "Product ID required");

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw createHttpError(404, "Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) throw createHttpError(404, "Cart item not found");

  cart.items.splice(itemIndex, 1);
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  await cart.save();

  return {
    success: true,
    message: "Cart item removed successfully",
    cart,
  };
};

export const CartService = { addToCart, getCartItem, removeItem };

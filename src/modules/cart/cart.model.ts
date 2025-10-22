import { model, Schema } from "mongoose";

const Item = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [Item],
  totalAmount: {
    type: Number,
    required: true,
  },
});

CartSchema.index({ user: 1 });

export const Cart = model("Cart", CartSchema);

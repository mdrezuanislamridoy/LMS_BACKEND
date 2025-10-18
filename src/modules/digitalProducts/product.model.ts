import { model, Schema } from "mongoose";
import type { IProduct } from "./product.interface.js";

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
    discount: Number,
    type: {
      type: String,
      enum: ["chrome extension", "software plugin", "e-book", "others"],
      default: "others",
      required: true,
    },
    thumbnail: {
      imageUrl: {
        type: String,
        required: true,
      },
      publicId: { type: String, required: true },
    },
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    carts: { type: Number, default: 0 },
    wished: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0, min: 1, max: 5 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    popularity: Number,
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.popularity =
    this.views * 0.2 +
    this.purchases * 1.5 +
    this.carts * 0.5 +
    this.wished * 0.3 +
    this.avgRating * 2;
});

export const Product = model<IProduct>("Product", productSchema);

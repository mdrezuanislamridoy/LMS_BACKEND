import { model, Schema } from "mongoose";
import type { ICategory } from "./category.interface.js";

const categoryModel = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    iconUrl: {
      type: String,
      required: true,
    },
    iconPublicId: { type: String, required: true },
  },
});

export const Category = model("Category", categoryModel);

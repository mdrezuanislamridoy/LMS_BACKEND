import { model, Schema } from "mongoose";
import type { IProduct } from "./product.interface.js";

const productSchema = new Schema<IProduct>({
    
});

export const Product = model<IProduct>("Product", productSchema);

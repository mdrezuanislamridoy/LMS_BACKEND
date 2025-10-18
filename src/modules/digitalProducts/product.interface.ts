import type { Document, Types } from "mongoose";

type Thumbnail = {
  imageUrl: string;
  publicId: string;
};

export interface IProduct extends Document {
  title: string;
  description: string;
  type: "chrome extension" | "software plugin" | "e-book" | "others";
  price: number;
  isFree: boolean;
  stock?: number;
  discount?: number;

  views: number;
  purchases: number;
  carts: number;
  wished: number;
  avgRating: number;
  reviews: Types.ObjectId[];
  popularity: number;
  thumbnail: Thumbnail;
  createdAt?: Date;
  updatedAt?: Date;
}

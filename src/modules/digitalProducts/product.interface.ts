type Thumbnail = {
  imageUrl: string;
  publicId: string;
};

export interface IProduct {
  title: string;
  description: string;
  type: "chrome extension" | "software plugin" | "e-book" | "others";
  price: number;
  isFree: boolean;
  stock?: number;
  discount?: number;
  category: string;
  thumbnail: Thumbnail;
  createdAt?: Date;
  updatedAt?: Date;
}

import type { Request } from "express";
import createHttpError from "http-errors";
import cloud from "../../utils/cloudinary.js";
import { Product } from "./product.model.js";

const addProduct = async (req: Request) => {
  const image = req.file;
  if (!image) {
    throw createHttpError(400, "Image is required");
  }

  const uploadStream = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        { folder: "LMS/productImage" },
        (err, data) => {
          if (data) resolve(data);
          else reject(err);
        }
      );
      stream.end(buffer);
    });
  };

  if (!uploadStream) {
    throw createHttpError(400, "Failed to upload image");
  }

  const result = await uploadStream(image.buffer);

  const imageUrl = result.secure_url;
  const publicId = result.public_id;

  const product = await Product.create({
    ...req.body,
    thumbnail: {
      imageUrl,
      publicId,
    },
  });

  if (!product) {
    throw createHttpError(400, "Failed to create product");
  }
  return {
    success: true,
    message: "Product created successful",
    product,
  };
};

const getProducts = async (req: Request) => {
  const { pageNumber = 1, limit = 16, search = "", type, sort } = req.query;

  const query = {};

  const page = Number(pageNumber);
  const limitation = Number(limit);

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (type) {
    query.type = type;
  }

  const skip = (page - 1) * limitation;

  let sortOptions = {};
  if (sort) {
    const [key, object] = (sort as string).split(":");
    sortOptions[key] = object === "desc" ? -1 : 1;
  } else {
    sortOptions = { createdAt: -1 };
  }

  const products = await Product.find(query)
    .sort()
    .limit(limitation)
    .skip(skip);

  if (!products) {
    throw createHttpError(404, "Product not found");
  }

  const totalProduct = await products.countDocuments(query);

  return {
    success: true,
    message: "Product fetched successful",
    page,
    pages: Math.ceil(totalProduct / limitation),
    totalProduct,
    products,
  };
};

const getProduct = async (req: Request) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  return {
    success: true,
    message: "Product fetched successfully",
    product,
  };
};

const deleteProduct = async (req: Request) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw createHttpError(404, "Product not found");
  }
  return {
    success: true,
    message: "Product deleted successfully",
  };
};

export const SProduct = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct
};

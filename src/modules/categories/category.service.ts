import type { NextFunction, Request } from "express";
import type { ICategory } from "./category.interface.js";
import { Category } from "./category.model.js";
import createHttpError from "http-errors";
import cloud from "../../utils/cloudinary.js";

const AddCategory = async (
  req: Request,
  payload: ICategory,
  next: NextFunction
) => {
  const icon = req.file;
  if (!icon) {
    return next(createHttpError(404, "Icon not found"));
  }

  const iconUploadStream = (buffer: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        { folder: "LMS/categoryIcon" },
        (err, data) => {
          if (data) resolve(data);
          else reject(err);
        }
      );
      stream.end(buffer);
    });
  };

  const result = await iconUploadStream(icon.buffer);

  const iconUrl = result?.secure_url;
  const iconPublicId = result?.public_id;

  return await Category.create({ ...payload, icon: { iconUrl, iconPublicId } });
};
const GetCategories = async () => {
  return await Category.find();
};

const DeleteCategory = async (id: string) => {
  const category = await Category.findById(id);
  const iconPublicId = category?.icon.iconPublicId;

  await cloud.uploader.destroy(`bac_commerce/categoryIcon/${iconPublicId}`);

  return await Category.findByIdAndDelete(id);
};

export const CService = { AddCategory, GetCategories, DeleteCategory };

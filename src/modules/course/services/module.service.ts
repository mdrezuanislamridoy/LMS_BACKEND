import type { Request } from "express";
import { CourseModule } from "../models/module.model.js";
import type { IModules } from "../interfaces/module.interface.js";
import cloud from "../../../utils/cloudinary.js";
import createHttpError from "http-errors";
import { CourseModel } from "../models/course.model.js";
import type { ICourse } from "../interfaces/course.interface.js";

const SCreateModule = async (req: Request) => {
  const courseId = req.params.id;
  const image = req.file;

  if (!image) {
    throw createHttpError(404, "Please add a thumbnail first");
  }

  const course: ICourse = CourseModel.findById(courseId);

  if (!course) {
    throw createHttpError(404, "Course Not Found");
  }

  const uploadStream = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        {
          folder: "LMS/moduleThumbnail",
        },
        (err, data) => {
          if (data) resolve(data);
          else reject(err);
        }
      );
      stream.end(buffer);
    });
  };

  const result = await uploadStream(image.buffer);

  const imageUrl = result?.secure_url;
  const publicId = result?.public_id;

  const data = req.data as IModules;

  const courseModule = await CourseModule.create({
    data,
    content: { thumbnail: { imageUrl, publicId } },
  });
  course.modules = [...course.modules, courseModule._id];
  await course.save();

  return courseModule;
};

export const MService = {
  SCreateModule,
};

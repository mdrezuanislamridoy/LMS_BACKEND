import type { Request } from "express";
import type { IThumbnail } from "./video.interface.js";
import { Video } from "./video.model.js";
import createHttpError from "http-errors";
import type { ICourse } from "../../course/course.interface.js";
import { CourseModel } from "../../course/course.model.js";
import { CourseModule } from "../../module/module.model.js";
import cloud from "../../../utils/cloudinary.js";

const SAddVideo = async (req: Request) => {
  const { id: courseId } = req.params;

  const course: ICourse | null = await CourseModel.findById(courseId);
  if (!course) throw createHttpError(404, "Course not found");

  const moduleId = req.body.moduleId;
  if (!moduleId) throw createHttpError(400, "Module ID is required");

  if (
    req.user.role === "mentor" &&
    !course.instructors.includes(req.user._id)
  ) {
    throw createHttpError(
      401,
      "You're not allowed to add video to this course"
    );
  }

  if (!course.modules.includes(moduleId))
    throw createHttpError(400, "Module does not belong to this course");

  const module = await CourseModule.findById(moduleId);
  if (!module) throw createHttpError(404, "Module not found");

  const image = req.file;
  if (!image) throw createHttpError(400, "Thumbnail image is required");

  const uploadStream = (buffer: Buffer) => {
    return new Promise<any>((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        { folder: "LMS/VideoThumbnail" },
        (err, data) => (err ? reject(err) : resolve(data))
      );
      stream.end(buffer);
    });
  };

  const result = await uploadStream(image.buffer);

  const thumbnail: IThumbnail = {
    imageUrl: result?.secure_url,
    publicId: result?.public_id,
  };

  const video = await Video.create({ ...req.body, thumbnail });
  if (!video) throw createHttpError(400, "Video creation failed");

  module.content = module.content || [];
  module.content.push(video._id);
  await module.save();

  return {
    success: true,
    message: "Video added successfully",
    video,
  };
};

export const SVideo = {
  SAddVideo,
};

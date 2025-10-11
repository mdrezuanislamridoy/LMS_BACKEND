import type { Request } from "express";
import type { ICourse } from "../interfaces/course.interface.js";
import { CourseModel } from "../models/course.model.js";
import createHttpError from "http-errors";
import cloud from "../../../utils/cloudinary.js";
import { Types } from "mongoose";

const createCourseService = async (req: Request, payload: ICourse) => {
  const thumbnail = req.file;

  if (!thumbnail) {
    throw createHttpError(404, "Thumbnail not found");
  }

  const uploadStream = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        {
          folder: "LMS/courseThumbnail",
        },
        (err, data) => {
          if (data) resolve(data);
          else reject(err);
        }
      );
      stream.end(buffer);
    });
  };
  const result = await uploadStream(thumbnail.buffer);

  const imageUrl = result?.secure_url;
  const publicId = result?.public_id;

  const course = await CourseModel.create({
    ...payload,
    addedBy: req.adminId,
    thumbnail: { imageUrl, publicId },
  });
  return course;
};

const getSingleCourseService = async (courseId: string) => {
  if (!Types.ObjectId.isValid(courseId)) {
    throw createHttpError(403, "Invalid Course ID Format");
  }

  const populateOption = [
    { path: "reviews", select: "rating comment user" },
    { path: "modules", select: "title content isLive" },
    { path: "instructors", select: "name expertise profileImage" },
    { path: "assignment", select: "title dueDate totalMarks" },
    { path: "quiz", select: "title totalMarks timeLimit" },
  ];

  const course = await CourseModel.findById(courseId)
    .populate(populateOption)
    .lean();

  if (!course) {
    throw createHttpError(404, "Course not found");
  }
  
  return course;
};

const getCoursesService = async () => {
  const courses = await CourseModel.find();
  return courses;
};
const updateCourseService = async (courseId: string, data: ICourse) => {
  if (!Types.ObjectId.isValid(courseId)) {
    throw createHttpError(403, "Invalid Course ID Format");
  }

  const courses = await CourseModel.findByIdAndUpdate(courseId, data, {
    new: true,
  });
  return courses;
};
const deleteCourseService = async (courseId: string) => {
  if (!Types.ObjectId.isValid(courseId)) {
    throw createHttpError(403, "Invalid Course ID Format");
  }

  const deletedCourse = await CourseModel.findOneAndDelete({ _id: courseId });
  return deletedCourse;
};

export const courseService = {
  createCourseService,
  getSingleCourseService,
  getCoursesService,
  updateCourseService,
  deleteCourseService,
};

import type { Request } from "express";
import createHttpError from "http-errors";
import cloud from "../../utils/cloudinary.js";
import { Types } from "mongoose";
import { populate } from "dotenv";
import type { ICourse } from "./course.interface.js";
import { CourseModel } from "./course.model.js";
import { Category } from "../categories/category.model.js";

const createCourseService = async (req: Request, payload: ICourse) => {
  const thumbnail = req.file;
  if (!thumbnail) throw createHttpError(404, "Thumbnail not found");

  const uploadStream = (buffer: Buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        { folder: "LMS/courseThumbnail" },
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

  if (!imageUrl || !publicId)
    throw createHttpError(400, "Failed to upload image");

  let incic = req.body.includedInThisCourse.split(",");
  let forwhom = req.body.forWhom.split(",");
  let wywl = req.body.whatYouWillLearn.split(",");

  const parsedBody = {
    ...req.body,
    includedInThisCourse: incic,
    forWhom: forwhom,
    whatYouWillLearn: wywl,
  };

  const course = await CourseModel.create({
    ...parsedBody,
    addedBy: req.user._id,
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
    {
      path: "modules",
      select: "title content isLive",
      populate: {
        path: "content",
        model: "Video",
        select: "title videoUrl duration thumbnail isFree description",
      },
    },
    { path: "mentor", select: "name expertise profileImage" },
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

const getCoursesService = async (req: Request) => {
  const {
    search = "",
    category = "",
    level = "",
    sort = "",
    pageNumber = 1,
    limit = 16,
  } = req.query;

  let query: {
    $or?: any[];
    category?: string;
    level?: string;
  } = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { about: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (level) {
    query.level = level;
  }

  const page = Number(pageNumber);
  const limitation = Number(limit);

  const skip = (page - 1) * limitation;

  const sortOptions: any = {};

  if (sort) {
    const [key, value] = (sort as string).split(":");
    sortOptions[key] = value === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const courses = await CourseModel.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitation)
    .lean();

  const total = await CourseModel.countDocuments(query);
  const totalPage = Math.ceil(total / limitation);
  return {
    success: true,
    message: "Courses fetched successfully",
    total,
    courses,
    totalPage,
  };
};

const getFeaturedCoursesService = async (req: Request) => {
  const { limitation = 10 } = req.query;

  const limit = Number(limitation);

  const courses = await CourseModel.find({ isFeatured: true })
    .limit(limit)
    .lean();
  return {
    success: true,
    message: "Featured Courses fetched successfully",
    courses,
  };
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

const topCourses = async (req: Request) => {
  const { limit = 10 } = req.query;

  const topCourses = await CourseModel.aggregate([]);
  return topCourses;
};

export const courseService = {
  createCourseService,
  getSingleCourseService,
  getCoursesService,
  updateCourseService,
  deleteCourseService,
  getFeaturedCoursesService,
};

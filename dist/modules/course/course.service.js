import createHttpError from "http-errors";
import cloud from "../../utils/cloudinary.js";
import { Types } from "mongoose";
import { CourseModel } from "./course.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
const createCourseService = async (req, payload) => {
    const thumbnail = req.file;
    if (!thumbnail)
        throw createHttpError(404, "Thumbnail not found");
    const uploadStream = (buffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloud.uploader.upload_stream({ folder: "LMS/courseThumbnail" }, (err, data) => {
                if (data)
                    resolve(data);
                else
                    reject(err);
            });
            stream.end(buffer);
        });
    };
    const result = await uploadStream(thumbnail.buffer);
    const imageUrl = result?.secure_url;
    const publicId = result?.public_id;
    if (!imageUrl || !publicId)
        throw createHttpError(400, "Failed to upload image");
    const incic = req.body.includedInThisCourse?.split(",") || [];
    const forwhom = req.body.forWhom?.split(",") || [];
    const wywl = req.body.whatYouWillLearn?.split(",") || [];
    const parsedBody = {
        ...req.body,
        includedInThisCourse: incic,
        forWhom: forwhom,
        whatYouWillLearn: wywl,
    };
    const course = await CourseModel.create({
        ...parsedBody,
        addedBy: req.user?._id,
        thumbnail: { imageUrl, publicId },
    });
    return course;
};
export const getSingleCourseService = async (courseId) => {
    if (!Types.ObjectId.isValid(courseId)) {
        throw createHttpError(403, "Invalid Course ID Format");
    }
    const populateOptions = [
        { path: "reviews", select: "rating comment user" },
        {
            path: "modules",
            select: "title content description isLive",
            populate: {
                path: "content",
                model: "Video",
                select: "title videoUrl duration thumbnail isFree description",
            },
        },
        {
            path: "instructors",
            model: "User",
        },
    ];
    const course = await CourseModel.findById(courseId)
        .populate(populateOptions)
        .lean();
    if (!course) {
        throw createHttpError(404, "Course not found");
    }
    return course;
};
const getCoursesService = async (req) => {
    const { search = "", category = "", level = "", sort = "", pageNumber = 1, limit = 16, } = req.query;
    const query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { about: { $regex: search, $options: "i" } },
        ];
    }
    if (category)
        query.category = category;
    if (level)
        query.level = level;
    const page = Number(pageNumber);
    const limitation = Number(limit);
    const skip = (page - 1) * limitation;
    const sortOptions = {};
    const allowedSortKeys = ["createdAt", "title", "category", "level"];
    if (sort && sort.includes(":")) {
        const [key, value] = sort.split(":");
        if (key &&
            allowedSortKeys.includes(key) &&
            ["asc", "desc"].includes(value)) {
            sortOptions[key] = value === "desc" ? -1 : 1;
        }
        else {
            sortOptions.createdAt = -1;
        }
    }
    else {
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
const getFeaturedCoursesService = async (req) => {
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
const updateCourseService = async (courseId, data) => {
    if (!Types.ObjectId.isValid(courseId)) {
        throw createHttpError(403, "Invalid Course ID Format");
    }
    const course = await CourseModel.findByIdAndUpdate(courseId, data, {
        new: true,
    });
    return course;
};
const deleteCourseService = async (courseId) => {
    if (!Types.ObjectId.isValid(courseId)) {
        throw createHttpError(403, "Invalid Course ID Format");
    }
    await Enrollment.deleteMany({
        course: courseId,
    });
    const deletedCourse = await CourseModel.findOneAndDelete({ _id: courseId });
    return deletedCourse;
};
const topCourses = async (req) => {
    const { limit = 10 } = req.query;
    const topCourses = await CourseModel.aggregate([]).limit(Number(limit));
    return topCourses;
};
export const courseService = {
    createCourseService,
    getSingleCourseService,
    getCoursesService,
    updateCourseService,
    deleteCourseService,
    getFeaturedCoursesService,
    topCourses,
};
//# sourceMappingURL=course.service.js.map
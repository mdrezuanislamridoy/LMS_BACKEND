import type { Request, NextFunction } from "express";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import cloudinary from "cloudinary";
import type { UploadedFile } from "express-fileupload";
import { Review } from "./review.model.js";
import type { IReview } from "./review.interface.js";
import type { IUser } from "../../auth/user/user.interface.js";

// Extend Express Request interface
// interface AuthRequest extends Request {
//   user?: Pick<IUser, "_id" | "role">; // Only include necessary fields
//   files?: UploadedFile[] | { [fieldname: string]: UploadedFile[] }; // For express-fileupload
// }

interface Image {
  imageUrl: string;
  publicId: string;
}

interface ReviewData {
  rating: number;
  comment: string;
}

const SAddReview = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const userId = req.user._id;
    const courseId = req.params.courseId;
    const data = req.body as ReviewData;
    const photos = Array.isArray(req.files)
      ? req.files
      : req.files && "photos" in req.files
      ? req.files.photos
      : undefined;

    if (!courseId) {
      throw createHttpError(400, "Course ID is required");
    }

    if (!Types.ObjectId.isValid(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }

    const images: Image[] = [];

    if (photos && Array.isArray(photos)) {
      const uploadStream = (
        buffer: Buffer
      ): Promise<cloudinary.UploadApiResponse> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "LMS/reviews",
            },
            (err, result) => {
              if (err) reject(err);
              else if (result) resolve(result);
              else reject(new Error("Upload failed"));
            }
          );
          stream.end(buffer);
        });
      };

      for (const photo of photos) {
        const result = await uploadStream(photo.buffer);
        images.push({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    const result = await Review.create({
      ...data,
      reviewer: userId,
      course: new Types.ObjectId(courseId),
      images,
    });

    return {
      success: true,
      message: "Review submitted successfully",
      review: result,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to submit review"
      )
    );
  }
};

const SGetReviews = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw createHttpError(400, "Invalid course ID");
  }
  return await Review.find({ course: new Types.ObjectId(id) });
};

const SDeleteReview = async (
  userId: string | undefined,
  id: string,
  next: NextFunction
) => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Invalid review ID");
    }

    const review = await Review.findById(id);
    if (!review) {
      throw createHttpError(404, "Review not found");
    }

    if (!userId || review.reviewer?.toString() !== userId) {
      throw createHttpError(401, "You're not allowed to delete this review");
    }

    await Review.findByIdAndDelete(id);
    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to delete review"
      )
    );
  }
};

export const RService = {
  SAddReview,
  SGetReviews,
  SDeleteReview,
};

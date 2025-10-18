import type { NextFunction, Request } from "express";

import createHttpError from "http-errors";
import type { IReview } from "./review.interface.js";
import { Review } from "./review.model.js";
import cloud from "../../../utils/cloudinary.js";

const SAddReview = async (req: Request) => {
  const userId = req.user._id;
  const courseId = req.params.courseId;
  const data = req.body;
  const photos = req.files;

  let images = [];

  if (photos) {
    const uploadStream = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloud.uploader.upload_stream(
          {
            folder: "LMS/reviews",
          },
          (err, data) => {
            if (err) reject(err);
            else resolve(data);
          }
        );
        stream.end(buffer);
      });
    };

    photos.map((photo) => {
      const fetch = async () => {
        const result = await uploadStream(photo.buffer);
        const image = {
          imageUrl: result.secure_url,
          publicId: result.public_id,
        };
        images.push(image);
      };
      fetch();
    });
  }

  const result = await Review.create({
    ...data,
    reviewer: userId,
    course: courseId,
    images,
  });

  return {
    success: true,
    message: "Review submitted successfully",
    review: result,
  };
};

export const SGetReviews = async (id: string) => {
  return await Review.find({ course: id });
};

export const SDeleteReview = async (
  userId: string | undefined,
  id: string,
  next: NextFunction
) => {
  const review = await Review.findById(id);

  if (review && review.reviewer?.toString() !== userId) {
    return next(
      createHttpError(401, "You're not allowed to delete this review")
    );
  }
  return await Review.findByIdAndDelete(id);
};

export const RService = {
  SAddReview,
  SGetReviews,
  SDeleteReview,
};

import { model, Schema } from "mongoose";
import type { IVideo, IThumbnail } from "./video.interface.js";

const Thumbnail = new Schema<IThumbnail>({
  imageUrl: String,
  publicId: String,
});

const VideoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  videoUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  thumbnail: Thumbnail,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Video = model("Video", VideoSchema);

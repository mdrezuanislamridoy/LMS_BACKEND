import { model, Schema } from "mongoose";
import type {
  IModuleContent,
  IModules,
} from "../interfaces/module.interface.js";

const Content = new Schema<IModuleContent>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  thumbnail: {
    imageUrl: String,
    publicId: String,
  },
});

const moduleSchema = new Schema<IModules>(
  {
    title: { type: String, required: true, trim: true },
    content: {
      type: [Content],
      required: true,
    },
    isLive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModule = model<IModules>("CourseModule", moduleSchema);

import { model, Schema } from "mongoose";
import type { IModules } from "./module.interface.js";

const moduleSchema = new Schema<IModules>(
  {
    title: { type: String, required: true, trim: true },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    isLive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModule = model<IModules>("Module", moduleSchema);

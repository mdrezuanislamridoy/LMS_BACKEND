import { model, Schema } from "mongoose";
import type { IAssignment } from "./assignment.interface.js";

const assignmentSchema = new Schema<IAssignment>(
  {
    course: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    student: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignmentUrl: { type: String, required: true },
    isSubmitted: { type: Boolean, default: false },
    marks: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "submitted", "graded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export const Assignment = model("Assignment", assignmentSchema);

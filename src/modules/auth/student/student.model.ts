import { Schema } from "mongoose";
import type { IStudent } from "./student.interface.js";
import { UserModel } from "../user/user.model.js";

const StudentSchema = new Schema<IStudent>({
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

StudentSchema.index({ enrolledCourses: 1 });

export const Student = UserModel.discriminator("student", StudentSchema);

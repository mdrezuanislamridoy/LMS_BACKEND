import { Schema } from "mongoose";
import type { IStudent } from "./student.interface.js";
import { UserModel } from "../user/user.model.js";

const StudentSchema = new Schema<IStudent>({
  profession: String,
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export const Student = UserModel.discriminator("student", StudentSchema);

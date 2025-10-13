import { Schema } from "mongoose";
import type { IMentor } from "./mentor.interface.js";
import { UserModel } from "../user/user.model.js";

const MentorSchema = new Schema<IMentor>({
  designation: String,
  departmentName: String,
  education_qualification: [String],
  workExperience: [String],
  myJoinedCourses: [Schema.Types.ObjectId],
});

export const Mentor = UserModel.discriminator("mentor", MentorSchema);

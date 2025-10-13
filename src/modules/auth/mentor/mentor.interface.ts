import type { Types } from "mongoose";
import type { IUser } from "../user/user.interface.js";

export interface IMentor extends IUser {
  designation?: string;
  departmentName?: string;
  education_qualification?: string[];
  workExperience?: string[];
  myJoinedCourses?: Types.ObjectId[];
}

import type { Types } from "mongoose";
import type { IUser } from "../user/user.interface.js";

export interface IStudent extends IUser {
  enrolledCourses?: Types.ObjectId[];
}

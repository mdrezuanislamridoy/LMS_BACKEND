import type { Types } from "mongoose";
import type { IUser } from "../user/user.interface.js";
export interface IMentor extends IUser {
    designation?: string;
    departmentName?: string;
    expertise?: string;
    education_qualification?: string[];
    workExperience?: string[];
    myJoinedCourses?: Types.ObjectId[];
}
//# sourceMappingURL=mentor.interface.d.ts.map
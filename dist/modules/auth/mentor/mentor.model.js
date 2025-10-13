import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
const MentorSchema = new Schema({
    designation: String,
    departmentName: String,
    education_qualification: [String],
    workExperience: [String],
    myJoinedCourses: [Schema.Types.ObjectId],
});
export const Mentor = UserModel.discriminator("mentor", MentorSchema);
//# sourceMappingURL=mentor.model.js.map
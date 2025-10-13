import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
const StudentSchema = new Schema({
    profession: String,
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});
export const Student = UserModel.discriminator("student", StudentSchema);
//# sourceMappingURL=student.model.js.map
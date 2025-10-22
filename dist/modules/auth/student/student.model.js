import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
const StudentSchema = new Schema({
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});
StudentSchema.index({ enrolledCourses: 1 });
export const Student = UserModel.discriminator("student", StudentSchema);
//# sourceMappingURL=student.model.js.map
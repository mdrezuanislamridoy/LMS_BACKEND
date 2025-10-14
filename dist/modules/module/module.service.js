import { CourseModule } from "../course/models/module.model.js";
import cloud from "../../utils/cloudinary.js";
import createHttpError from "http-errors";
import { CourseModel } from "../course/models/course.model.js";
const SCreateModule = async (req) => {
    const courseId = req.params.id;
    let data = req.body;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course Not Found");
    }
    const module = await CourseModule.create(data);
    course.modules.push(module._id);
    course.save();
};
export const MService = {
    SCreateModule,
};
//# sourceMappingURL=module.service.js.map
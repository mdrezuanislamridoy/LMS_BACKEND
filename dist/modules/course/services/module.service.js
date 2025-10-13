import { CourseModule } from "../models/module.model.js";
import cloud from "../../../utils/cloudinary.js";
import createHttpError from "http-errors";
import { CourseModel } from "../models/course.model.js";
const SCreateModule = async (req) => {
    const courseId = req.params.id;
    const image = req.file;
    if (!image) {
        throw createHttpError(404, "Please add a thumbnail first");
    }
    const course = CourseModel.findById(courseId);
    if (!course) {
        throw createHttpError(404, "Course Not Found");
    }
    const uploadStream = (buffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloud.uploader.upload_stream({
                folder: "LMS/moduleThumbnail",
            }, (err, data) => {
                if (data)
                    resolve(data);
                else
                    reject(err);
            });
            stream.end(buffer);
        });
    };
    const result = await uploadStream(image.buffer);
    const imageUrl = result?.secure_url;
    const publicId = result?.public_id;
    const data = req.data;
    const courseModule = await CourseModule.create({
        data,
        content: { thumbnail: { imageUrl, publicId } },
    });
    course.modules = [...course.modules, courseModule._id];
    await course.save();
    return courseModule;
};
export const MService = {
    SCreateModule,
};
//# sourceMappingURL=module.service.js.map
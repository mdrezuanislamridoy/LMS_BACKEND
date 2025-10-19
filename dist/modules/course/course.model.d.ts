import mongoose from "mongoose";
import type { ICourse } from "./course.interface.js";
export declare const CourseModel: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<ICourse, {}, {}, {}, mongoose.Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=course.model.d.ts.map
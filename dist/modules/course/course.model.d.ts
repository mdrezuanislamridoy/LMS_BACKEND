import mongoose from "mongoose";
import type { ICourse } from "./course.interface.js";
export declare const CourseModel: mongoose.Model<ICourse, {}, {}, {}, mongoose.Document<unknown, {}, ICourse, {}, mongoose.DefaultSchemaOptions> & ICourse & Required<{
    _id: unknown;
}> & {
    __v: number;
}, mongoose.Schema<ICourse, mongoose.Model<ICourse, any, any, any, mongoose.Document<unknown, any, ICourse, any, {}> & ICourse & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICourse, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICourse>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ICourse> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>>;
//# sourceMappingURL=course.model.d.ts.map
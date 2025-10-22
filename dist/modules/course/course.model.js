import mongoose, { model, mongo, Schema, Types } from "mongoose";
const ProjectSchema = new Schema({
    title: { type: String, required: true },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const Thumbnail = new Schema({
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
});
const courseSchema = new Schema({
    addedBy: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
    title: { type: String, required: true },
    batchNo: {
        type: Number,
        required: true,
        default: 0,
    },
    ratings: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Review",
        },
    ],
    enrolledStudents: {
        type: Number,
        required: true,
        default: 0,
    },
    duration: {
        type: String,
    },
    live: {
        type: Boolean,
        required: true,
        default: false,
    },
    completedBy: {
        type: Number,
        default: 0,
    },
    modules: [
        {
            type: Schema.Types.ObjectId,
            ref: "Module",
        },
    ],
    introVideo: String,
    thumbnail: {
        type: Thumbnail,
        required: true,
    },
    includedInThisCourse: [{ type: String, required: true }],
    about: { type: String, required: true },
    forWhom: [{ type: String, required: true }],
    instructors: [{ type: Schema.Types.ObjectId, ref: "Instructor" }],
    projectsFromThis: [ProjectSchema],
    price: {
        type: Number,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    discount: Number,
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    whatYouWillLearn: [
        {
            type: String,
            required: true,
        },
    ],
    quiz: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
        },
    ],
    couponCodes: [{ type: Schema.Types.ObjectId, ref: "Coupon" }],
    assignment: [{ type: Schema.Types.ObjectId, ref: "Assignment" }],
    certificate: {
        type: String,
    },
    meetings: [{ type: Schema.Types.ObjectId }],
}, {
    timestamps: true,
});
courseSchema.index({ title: "text", about: "text" });
courseSchema.index({ category: 1 });
courseSchema.index({ instructors: 1 });
courseSchema.index({ live: 1 });
courseSchema.index({ isFree: 1 });
courseSchema.index({ discount: 1 });
courseSchema.index({ ratings: -1 });
courseSchema.index({ enrolledStudents: -1 });
courseSchema.index({ ratings: -1, enrolledStudents: -1 });
courseSchema.index({ createdAt: -1 });
export const CourseModel = mongoose.models.Course || model("Course", courseSchema);
//# sourceMappingURL=course.model.js.map
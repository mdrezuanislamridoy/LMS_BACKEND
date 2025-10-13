import { model, Schema } from "mongoose";
const enrollmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    discounted: { type: Number, default: 0 },
    discountType: {
        type: String,
        enum: ["percentage", "amount"],
        default: "percentage",
    },
    status: {
        type: String,
        enum: ["paid", "pending", "cancelled"],
        default: "pending",
    },
    transactionId: String,
    phone: {
        type: String,
        required: true,
    },
    progress: {
        finishedModules: [{ type: Schema.Types.ObjectId, ref: "CourseModule" }],
        finishedVideos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
        totalModules: {
            type: Number,
            default: 0,
        },
        totalVideos: {
            type: Number,
            default: 0,
        },
        percentage: {
            type: Number,
            default: 0,
        },
        lastAccessedVideo: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    },
    certificateIssued: { type: Boolean, default: false },
}, { timestamps: true });
export const Enrollment = model("Enrollment", enrollmentSchema);
//# sourceMappingURL=enrollment.model.js.map
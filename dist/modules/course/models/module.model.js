import { model, Schema } from "mongoose";
const Content = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    thumbnail: {
        imageUrl: String,
        publicId: String,
    },
});
const moduleSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: {
        type: [Content],
        required: true,
    },
    isLive: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
export const CourseModule = model("CourseModule", moduleSchema);
//# sourceMappingURL=module.model.js.map
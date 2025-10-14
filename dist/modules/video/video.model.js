import { model, Schema } from "mongoose";
const Thumbnail = new Schema({
    imageUrl: String,
    publicId: String,
});
const VideoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    videoUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    thumbnail: Thumbnail,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const Video = model("Video", VideoSchema);
//# sourceMappingURL=video.model.js.map
import { model, Schema } from "mongoose";
const moduleSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
    isLive: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
moduleSchema.index({ title: "text" });
export const CourseModule = model("Module", moduleSchema);
//# sourceMappingURL=module.model.js.map
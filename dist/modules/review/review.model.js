import { model, Schema } from "mongoose";
const reviewModel = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export const Review = model("Review", reviewModel);
//# sourceMappingURL=review.model.js.map
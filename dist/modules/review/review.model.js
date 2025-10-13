import { model, Schema } from "mongoose";
const reviewModel = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
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
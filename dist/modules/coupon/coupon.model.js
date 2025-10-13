import { model, Schema } from "mongoose";
const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
    discount: { type: Number, required: true },
    discountType: {
        type: String,
        enum: ["percentage", "amount"],
        default: "percentage",
    },
    minSpend: Number,
    maxDiscount: Number,
    expiresIn: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
export const Coupon = model("Coupon", couponSchema);
//# sourceMappingURL=coupon.model.js.map
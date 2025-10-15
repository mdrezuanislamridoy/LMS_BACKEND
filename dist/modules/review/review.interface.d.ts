import type { Document, Types } from "mongoose";
export interface IReview extends Document {
    reviewer: Types.ObjectId;
    course: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=review.interface.d.ts.map
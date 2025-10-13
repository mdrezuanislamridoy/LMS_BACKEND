import type { Document, Types } from "mongoose";
export interface IEnrollment extends Document {
    user: Types.ObjectId;
    courseId: Types.ObjectId;
    totalAmount: number;
    discounted: number;
    discountType: "parcentage" | "amount";
    status: "paid" | "pending" | "cancelled";
    transactionId: string;
    phone: string;
    progress: {
        finishedModules: Types.ObjectId[];
        finishedVideos: Types.ObjectId[];
        totalModules: number;
        totalVideos: number;
        percentage: number;
        lastAccessedVideo: Types.ObjectId;
    };
    certificateIssued: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=enrollment.interface.d.ts.map
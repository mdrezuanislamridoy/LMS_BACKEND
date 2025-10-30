import { Document, Types } from "mongoose";
export interface IProject {
    title: string;
    thumbnail: string;
    description: string;
}
export interface IThumbnail {
    imageUrl: string;
    publicId: string;
}
export interface ICourse extends Document {
    addedBy: Types.ObjectId;
    title: string;
    batchNo: number;
    ratings?: number;
    reviews: Types.ObjectId[];
    enrolledStudents: number;
    duration: string;
    live: boolean;
    completedBy: number;
    modules: Types.Array<Types.ObjectId>;
    thumbnail: IThumbnail;
    introVideo?: string;
    includedInThisCourse: string[];
    about: string;
    forWhom: string[];
    instructors: Types.ObjectId[];
    projectsFromThis: IProject[];
    price: number;
    isFree: boolean;
    discount?: number;
    category: Types.ObjectId;
    whatYouWillLearn: string[];
    couponCodes: Types.ObjectId[];
    quiz?: Types.ObjectId[];
    assignment?: Types.ObjectId[];
    certificate?: string;
    meetings: Types.ObjectId[];
    isFeatured?: boolean;
    popular: number;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=course.interface.d.ts.map
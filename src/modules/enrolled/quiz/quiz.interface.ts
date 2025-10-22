import type { Document, Types } from "mongoose";

export interface IOptions {
  question: string[];
  answer: string;
}

export interface IQuiz extends Document {
  questions: IOptions[];
  totalMark: number;
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  duration: Date;
  createdAt: Date;
}

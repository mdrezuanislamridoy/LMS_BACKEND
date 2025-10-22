import { model, Schema } from "mongoose";
import type { IOptions, IQuiz } from "./quiz.interface.js";

const Option = new Schema<IOptions>({
  question: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema<IQuiz>({
  questions: [Option],
  totalMark: {
    type: Number,
    required: true,
  },
  duration: {
    type: Date,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Module",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Quiz = model<IQuiz>("Quiz", quizSchema);

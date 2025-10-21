import type { Types } from "mongoose";

type Status = "pending" | "submitted" | "graded";

export interface IAssignment {
  course?: Types.ObjectId;
  student?: Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  assignmentUrl?: string;
  isSubmitted: boolean;
  status?: Status;
  marks: number;
  createdAt: Date;
  updatedAt: Date;
}

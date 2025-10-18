import { Document, model, Types } from "mongoose";

export interface IMeeting extends Document {
  courseId: Types.ObjectId;
  title: string;
  description: string;
  meetingLink: string;
  date: Date;
  startTime: string;
  isPaid: boolean;
}

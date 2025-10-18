import { Document, model } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  description: string;
  meetingLink: string;
  date: Date;
  startTime: string;
  isPaid: boolean;
}

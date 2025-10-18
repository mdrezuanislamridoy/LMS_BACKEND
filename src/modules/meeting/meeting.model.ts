import { model, Schema, Types } from "mongoose";
import type { IMeeting } from "./meeting.interface.js";

const MeetingSchema = new Schema<IMeeting>({
  courseId: { type: Schema.Types.ObjectId, required: true },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

export const Meeting = model("Meeting", MeetingSchema);

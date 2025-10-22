import { model, Schema } from "mongoose";
import type { IEvent } from "./event.interface.js";

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  participants: [{
    type: Schema.Types.ObjectId,
  }],
  eventType: {
    type: String,
    enum: ["webinar", "workshop", "exam", "meeting"],
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

EventSchema.index({ title: "text", date: 1 });

export const Event = model("Event", EventSchema);
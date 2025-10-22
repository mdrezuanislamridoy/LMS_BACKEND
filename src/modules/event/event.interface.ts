import type { Document } from "mongoose";

type EventType = "webinar" | "workshop" | "exam" | "meeting";
export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  time: string;
  eventType: EventType;
  organizer: string;
  participants?: string[];
  link?: string;
  coverImage?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

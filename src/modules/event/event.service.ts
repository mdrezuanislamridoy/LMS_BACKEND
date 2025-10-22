import createHttpError from "http-errors";
import type { IEvent } from "./event.interface.js";
import { Event } from "./event.model.js";

const createEvent = async (req: Request) => {
  const event: IEvent = await Event.create(req.body);
  if (!event) {
    throw createHttpError(400, "Event creation failed");
  }
  return {
    success: true,
    message: "Event created successfully",
    event,
  };
};
const getEvent = async (req: Request) => {};
const updateEvent = async (req: Request) => {};
const deleteEvent = async (req: Request) => {};

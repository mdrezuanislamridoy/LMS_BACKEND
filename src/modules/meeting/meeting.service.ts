import type { Request } from "express";
import { CourseModel } from "../course/course.model.js";
import createHttpError from "http-errors";
import { Meeting } from "./meeting.model.js";
import { success } from "zod";

const SCreateMeeting = async (req: Request) => {
  const courseId = req.params.id;
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw createHttpError(400, "Course not found to add meeting link");
  }

  const meeting = await Meeting.create({ ...req.body, courseId });

  course.meetings.push = meeting._id;
  await course.save();
};

const SGetMeetings = async (req: Request) => {
  const courseId = req.params.id;
  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw createHttpError(400, "Course not found");
  }

  return {
    success: true,
    message: "Meeting fetched successfully",
    meetings: course.meetings,
  };
};

export const SMeeting = {
  SCreateMeeting,
  SGetMeetings,
};

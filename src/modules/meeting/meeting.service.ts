import type { Request } from "express";
import { CourseModel } from "../course/course.model.js";
import createHttpError from "http-errors";
import { Meeting } from "./meeting.model.js";
import mongoose from "mongoose";

const SCreateMeeting = async (req: Request) => {
  const courseId = req.params.courseId;
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw createHttpError(404, "Course not found to add meeting link");
  }

  const meeting = await Meeting.create({ ...req.body, courseId });

  const meetingId = (meeting._id as mongoose.Types.ObjectId).toString();

  if (!mongoose.Types.ObjectId.isValid(meetingId)) {
    throw createHttpError(400, "Invalid meeting ID format");
  }
  course.meetings.push(new mongoose.Types.ObjectId(meetingId));
  await course.save();

  return {
    success: true,
    message: "Meeting created successfully",
    meeting,
  };
};

const SGetMeetings = async (req: Request) => {
  const courseId = req.params.courseId;
  const course = await CourseModel.findById(courseId).populate("meetings");

  if (!course) {
    throw createHttpError(404, "Course not found");
  }

  return {
    success: true,
    message: "Meetings fetched successfully",
    meetings: course.meetings,
  };
};

const SGetMeeting = async (req: Request) => {
  const meetingId = req.params.meetingId;
  const meeting = await Meeting.findById(meetingId);

  if (!meeting) {
    throw createHttpError(404, "Meeting not found");
  }

  return {
    success: true,
    message: "Meeting fetched successfully",
    meeting,
  };
};

const SUpdateMeeting = async (req: Request) => {
  const meetingId = req.params.meetingId;
  const meeting = await Meeting.findByIdAndUpdate(meetingId, req.body, {
    new: true,
  });

  if (!meeting) {
    throw createHttpError(404, "Meeting not found");
  }

  return {
    success: true,
    message: "Meeting updated successfully",
    meeting,
  };
};

const SDeleteMeeting = async (req: Request) => {
  const meetingId = req.params.meetingId;
  const meeting = await Meeting.findByIdAndDelete(meetingId);

  if (!meeting) {
    throw createHttpError(404, "Meeting not found");
  }

  // Remove meeting reference from course
  await CourseModel.updateMany(
    { meetings: meetingId },
    { $pull: { meetings: meetingId } }
  );

  return {
    success: true,
    message: "Meeting deleted successfully",
    meeting,
  };
};

export const SMeeting = {
  SCreateMeeting,
  SGetMeetings,
  SGetMeeting,
  SUpdateMeeting,
  SDeleteMeeting,
};

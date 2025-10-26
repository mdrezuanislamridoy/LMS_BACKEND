import createHttpError from "http-errors";
import { Assignment } from "./assignment.model.js";
import type { IUser } from "../../auth/user/user.interface.js";
import type { IAssignment } from "./assignment.interface.js";
import { sendMail } from "../../../utils/sendMail.js";
import type { Request } from "express";

const createAssignment = async (req: Request) => {
  const courseId = req.params.id;

  const assignment = await Assignment.create({
    ...req.body,
    courseId,
  });

  if (!assignment) {
    throw createHttpError(400, "Assignment creation failed");
  }

  return {
    success: true,
    message: "Assignment created successfully",
    assignment,
  };
};

const getAssignment = async (req: Request) => {
  const userId = req.user._id;
  const assignmentId = req.params.id;

  const assignment = await Assignment.findOne({
    student: userId,
    _id: assignmentId,
  });

  if (!assignment) {
    throw createHttpError(404, "Assignment not found");
  }

  return {
    success: true,
    message: "Assignment found successfully",
    assignment,
  };
};

const updateAssignment = async (req: Request) => {
  const assignmentId = req.params.id;

  const user: IUser = req.user;

  let assignment: IAssignment | null = await Assignment.findById(assignmentId);

  if (!assignment) {
    throw createHttpError(404, "Assignment not found");
  }
  if (
    user.role === "admin" ||
    (user.role === "mentor" &&
      assignment?.course?.instructors?.includes(user?._id))
  ) {
    assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { ...req.body },
      {
        new: true,
      }
    );
  } else {
    throw createHttpError(403, "You're not allowed to do this");
  }
};

const submitAssignment = async (req: Request) => {
  const assignmentId = req.params.id;
  const user: IUser | null = req.user;

  let assignment: IAssignment | null = await Assignment.findById(assignmentId);

  if (!assignment) {
    throw createHttpError(404, "Assignment not found");
  }

  if (user?.role !== "student" && !assignment?.student === user?._id) {
    throw createHttpError(403, "You're not allowed to do this");
  }

  assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    { isSubmitted: true },
    {
      new: true,
    }
  );

  sendMail(
    user?.email as string,
    "Assignment submitted successfully",
    `${assignment?.title} has been submitted successfully`
  );

  return {
    success: true,
    message: "Assignment submitted successfully",
    assignment,
  };
};

const setMarkIntoAssignment = async (req: Request) => {
  const assignmentId = req.params.id;
  const user: IUser | null = req.user;

  let assignment: IAssignment | null = await Assignment.findById(
    assignmentId
  ).populate("course");

  if (!assignment) {
    throw createHttpError(404, "Assignment not found");
  }

  if (
    user?.role === "admin" ||
    (user?.role === "mentor" &&
      assignment?.course?.instructors?.includes(user?._id))
  ) {
    assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { marks: req?.body?.marks },
      {
        new: true,
      }
    );
  }

  return {
    success: true,
    message: "Assignment  marked successfully",
    assignment,
  };
};

const deleteAssignment = async (req: Request) => {
  const assignmentId = req.params.id;
  const user: IUser | null = req.user;

  let assignment: IAssignment | null = await Assignment.findById(
    assignmentId
  ).populate("course");

  if (!assignment) {
    throw createHttpError(404, "Assignment not found");
  }

  if (
    user?.role === "admin" ||
    (user?.role === "mentor" &&
      assignment?.course?.instructors?.includes(user?._id))
  ) {
    assignment = await Assignment.findByIdAndDelete(assignmentId);
  }

  return {
    success: true,
    message: "Assignment deleted successfully",
    assignment,
  };
};

const getMyCompletedAssignments = async (req: Request) => {
  const userId = req.user._id;

  const assignments = await Assignment.find({
    student: userId,
    isSubmitted: true,
  });

  return {
    success: true,
    message: "Assignments found successfully",
    assignments,
  };
};

export const AssignmentService = {
  createAssignment,
  getAssignment,
  setMarkIntoAssignment,
  submitAssignment,
  updateAssignment,
  deleteAssignment,
  getMyCompletedAssignments,
};

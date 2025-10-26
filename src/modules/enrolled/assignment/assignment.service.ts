import type { Request, NextFunction } from "express";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import { Assignment } from "./assignment.model.js";
import type { IAssignment } from "./assignment.interface.js";
import { sendMail } from "../../../utils/sendMail.js";

// Define Course interface for populated course field
interface ICourse {
  _id: Types.ObjectId;
  instructors: Types.ObjectId[];
  // Add other fields as needed
}

// Define User type for type safety
interface AuthUser {
  _id: Types.ObjectId;
  role: "student" | "mentor" | "admin";
  email: string;
}

type PopulatedAssignment = Omit<IAssignment, "course"> & {
  course: ICourse;
};

const createAssignment = async (req: Request, next: NextFunction) => {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      throw createHttpError(400, "Course ID is required");
    }
    // Validate courseId
    if (!Types.ObjectId.isValid(courseId)) {
      throw createHttpError(400, "Invalid course ID");
    }

    const assignment = await Assignment.create({
      ...req.body,
      courseId: new Types.ObjectId(courseId),
    });

    if (!assignment) {
      throw createHttpError(400, "Assignment creation failed");
    }

    return {
      success: true,
      message: "Assignment created successfully",
      assignment,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to create assignment"
      )
    );
  }
};

const getAssignment = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; // Use specific type
    const assignmentId = req.params.id;
    if (!assignmentId) {
      throw createHttpError(400, "Assignment ID is required");
    }
    // Validate assignmentId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw createHttpError(400, "Invalid assignment ID");
    }

    const assignment = await Assignment.findOne({
      student: user._id,
      _id: new Types.ObjectId(assignmentId),
    });

    if (!assignment) {
      throw createHttpError(404, "Assignment not found");
    }

    return {
      success: true,
      message: "Assignment found successfully",
      assignment,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to fetch assignment"
      )
    );
  }
};

const updateAssignment = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; // Use specific type
    const assignmentId = req.params.id;
    if (!assignmentId) {
      throw createHttpError(400, "Assignment ID is required");
    }
    // Validate assignmentId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw createHttpError(400, "Invalid assignment ID");
    }

    const assignment: PopulatedAssignment | null = await Assignment.findById(
      assignmentId
    ).populate<{ course: ICourse }>("course");

    if (!assignment) {
      throw createHttpError(404, "Assignment not found");
    }

    if (
      user.role === "admin" ||
      (user.role === "mentor" &&
        assignment.course?.instructors?.some((instructor) =>
          instructor.equals(user._id)
        ))
    ) {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        { ...req.body },
        { new: true }
      );

      if (!updatedAssignment) {
        throw createHttpError(404, "Assignment not found after update");
      }

      return {
        success: true,
        message: "Assignment updated successfully",
        assignment: updatedAssignment,
      };
    } else {
      throw createHttpError(
        403,
        "You're not allowed to update this assignment"
      );
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to update assignment"
      )
    );
  }
};

const submitAssignment = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; // Use specific type
    const assignmentId = req.params.id;
    if (!assignmentId) {
      throw createHttpError(400, "Assignment ID is required");
    }
    // Validate assignmentId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw createHttpError(400, "Invalid assignment ID");
    }

    const assignment: IAssignment | null = await Assignment.findById(
      assignmentId
    );

    if (!assignment) {
      throw createHttpError(404, "Assignment not found");
    }

    if (user.role !== "student" || !assignment.student?.equals(user._id)) {
      throw createHttpError(
        403,
        "You're not allowed to submit this assignment"
      );
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { isSubmitted: true },
      { new: true }
    );

    if (!updatedAssignment) {
      throw createHttpError(404, "Assignment not found after update");
    }

    // Send email notification
    await sendMail(
      user.email,
      "Assignment Submitted Successfully",
      `${updatedAssignment.title} has been submitted successfully`
    );

    return {
      success: true,
      message: "Assignment submitted successfully",
      assignment: updatedAssignment,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to submit assignment"
      )
    );
  }
};

const setMarkIntoAssignment = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; // Use specific type
    const assignmentId = req.params.id;
    if (!assignmentId) {
      throw createHttpError(400, "Assignment ID is required");
    }
    // Validate assignmentId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw createHttpError(400, "Invalid assignment ID");
    }

    const assignment: PopulatedAssignment | null = await Assignment.findById(
      assignmentId
    ).populate<{ course: ICourse }>("course");

    if (!assignment) {
      throw createHttpError(404, "Assignment not found");
    }

    if (
      user.role === "admin" ||
      (user.role === "mentor" &&
        assignment.course?.instructors?.some((instructor) =>
          instructor.equals(user._id)
        ))
    ) {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        { marks: req.body.marks },
        { new: true }
      );

      if (!updatedAssignment) {
        throw createHttpError(404, "Assignment not found after update");
      }

      return {
        success: true,
        message: "Assignment marked successfully",
        assignment: updatedAssignment,
      };
    } else {
      throw createHttpError(403, "You're not allowed to mark this assignment");
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to mark assignment"
      )
    );
  }
};

const deleteAssignment = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; // Use specific type
    const assignmentId = req.params.id;
    if (!assignmentId) {
      throw createHttpError(400, "Assignment ID is required");
    }
    // Validate assignmentId
    if (!Types.ObjectId.isValid(assignmentId)) {
      throw createHttpError(400, "Invalid assignment ID");
    }

    const assignment: PopulatedAssignment | null = await Assignment.findById(
      assignmentId
    ).populate<{ course: ICourse }>("course");

    if (!assignment) {
      throw createHttpError(404, "Assignment not found");
    }

    if (
      user.role === "admin" ||
      (user.role === "mentor" &&
        assignment.course?.instructors?.some((instructor) =>
          instructor.equals(user._id)
        ))
    ) {
      const deletedAssignment = await Assignment.findByIdAndDelete(
        assignmentId
      );

      if (!deletedAssignment) {
        throw createHttpError(404, "Assignment not found after deletion");
      }

      return {
        success: true,
        message: "Assignment deleted successfully",
        assignment: deletedAssignment,
      };
    } else {
      throw createHttpError(
        403,
        "You're not allowed to delete this assignment"
      );
    }
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to delete assignment"
      )
    );
  }
};

const getMyCompletedAssignments = async (req: Request, next: NextFunction) => {
  try {
    if (!req.user) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = req.user as AuthUser; 
    const assignments = await Assignment.find({
      student: user._id,
      isSubmitted: true,
    });

    return {
      success: true,
      message: "Assignments found successfully",
      assignments,
    };
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to fetch assignments"
      )
    );
  }
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

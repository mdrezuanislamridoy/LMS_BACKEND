import z from "zod";

export const VAssignmentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.date(),
    assignmentUrl: z.string().min(1, "Assignment URL is required"),
    isSubmitted: z.boolean().default(false),
    marks: z.number().default(0),
    status: z.enum(["pending", "submitted", "graded"]).default("pending"),
  }),
  params: z.object({
    id: z.string(),
  }),
});

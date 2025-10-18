import z from "zod";

export const VMeetingSchema = z.object({
  body: z.object({
    titel: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    meetingLink: z.string().min(1, "Meeting link is required"),
    isPaid: z.boolean().default(false),
    startTime: z.string().min(1,"Starting time is required"),
    date: z.date(),
  }),
});

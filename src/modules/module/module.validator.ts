import z from "zod";

export const VModuleSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    isLive: z.boolean().default(false),
  }),
  params: z.object({
    id: z.string(),
  }),
});

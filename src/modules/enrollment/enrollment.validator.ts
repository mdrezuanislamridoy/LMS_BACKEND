import z from "zod";

export const VEnrollmentSchema = z.object({
  body: z.object({
    phone: z.string().min(1, "Phone number is required"),
  }),
  params: z.object({
    id: z.string(),
  }),
});

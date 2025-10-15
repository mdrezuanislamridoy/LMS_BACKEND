import z from "zod";
export const VEnrollmentSchema = z.object({
    body: z.object({
        phone: z.string().min(1, "Phone number is required"),
    }),
    params: z.object({
        id: z.string(),
    }),
});
export const VUpdateEnrollmentSchema = z.object({
    body: z.object({
        status: z.enum(["paid", "pending", "cancelled"]).default("pending"),
    }),
    params: z.object({
        id: z.string(),
    }),
});
//# sourceMappingURL=enrollment.validator.js.map
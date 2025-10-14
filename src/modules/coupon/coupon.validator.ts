import z from "zod";

export const couponSchema = z.object({
  body: z.object({
    code: z.string().min(3).max(20),
    courses: z.array(z.string().length(24)),
    discount: z.number().positive(),
    discountType: z.enum(["percentage", "amount"]),
    minSpend: z.number(),
    maxDiscount: z.number(),
    expiresIn: z.date(),
    isActive: z.boolean,
  }),
});

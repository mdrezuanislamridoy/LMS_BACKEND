import z from "zod";

export const CartSchema = z.object({
  body: z.object({
    user: z.string(),
    course: z.array(
      z.object({
        product: z.string(),
        quantity: z.number(),
        price: z.number(),
      })
    ),
    totalAmount: z.number(),
  }),
});

import z from "zod";

export const ProductValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  isFree: z.boolean().default(false),
  stock: z.number(),
  discount: z.number().default(0),
  type: z
    .enum(["chrome extension", "software plugin", "e-book", "others"])
    .default("others"),
});

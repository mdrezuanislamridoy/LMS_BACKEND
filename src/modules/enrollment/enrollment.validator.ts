import Joi from "joi";

export const EnrollmentSchema = Joi.object({
  couponCode: Joi.string().optional(),
  totalAmount: Joi.number().required(),
  discounted: Joi.number().optional().default(0),
  discountType: Joi.string()
    .optional()
    .valid("parcentage", "amount")
    .default("parcentage"),
  phone: Joi.string().required(),
});

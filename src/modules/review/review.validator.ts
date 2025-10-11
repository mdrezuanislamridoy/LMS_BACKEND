import Joi from "joi";
export const VReviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5).default(1),
  comment: Joi.string().required(),
});

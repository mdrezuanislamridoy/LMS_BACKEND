import Joi from "joi";

const VConst = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string(),
  videoUrl: Joi.string(),
});

export const VModule = Joi.object({
    
});

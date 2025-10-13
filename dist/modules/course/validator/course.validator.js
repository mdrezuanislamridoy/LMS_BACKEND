import Joi from "joi";
export const VCourseSchema = Joi.object({
    addedBy: Joi.string().required(),
    title: Joi.string().required().trim().min(4),
    batchNo: Joi.number().required().default(1),
    rating: Joi.number().min(1).max(5).default(0).optional(),
    reviews: Joi.array().valid(Joi.string()).optional().default([]),
    enrolledStudents: Joi.number().default(0).optional(),
    duration: Joi.string().optional(),
    live: Joi.boolean().default(false),
    completedBy: Joi.number().default(0),
    modules: Joi.array().valid(Joi.string()).optional().default([]),
    introVideo: Joi.string().optional(),
    includedInThisCourse: Joi.array()
        .valid(Joi.string())
        .required()
        .min(1)
        .default([]),
    about: Joi.string().required(),
    forWhom: Joi.array().valid(Joi.string()).required().min(1).default([]),
    price: Joi.number().required(),
    isFree: Joi.boolean().default(false),
    discount: Joi.number().default(0),
    category: Joi.string().required(),
    whatYouWillLearn: Joi.array()
        .valid(Joi.string())
        .required()
        .min(1)
        .default([]),
    quiz: Joi.array().valid(Joi.string()).optional().default([]),
    assignment: Joi.array().valid(Joi.string()).optional().default([]),
    certificate: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});
//# sourceMappingURL=course.validator.js.map
import z from "zod";
export const VCourseSchema = z.object({
    body: {
        title: z.string().trim().min(4, "Title must be at least 4 character"),
        batchNo: z.number().default(1),
        live: z.boolean().default(false),
        introVideo: z.string().optional(),
        includedInThisCourse: z
            .array(z.string())
            .min(1, "At least one item is required")
            .default([]),
        about: z.string().min(1, "About is required"),
        forWhom: z
            .array(z.string())
            .min(1, "At least one item is required")
            .default([]),
        price: z.number().positive("Price must be positive"),
        isFree: z.boolean().default(false),
        discount: z.number().default(0),
        category: z.string().min(1, "Category is required"),
        whatYouWillLearn: z
            .array(z.string())
            .min(1, "At least one item is required")
            .default([]),
        quiz: z.array(z.string()).optional().default([]),
    },
    params: {
        id: z.string(),
    },
});
//# sourceMappingURL=course.validator.js.map
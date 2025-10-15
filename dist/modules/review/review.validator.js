import z from "zod";
export const VReviewSchema = z.object({
    body: z.object({
        rating: z.number().min(1).max(5),
        comment: z.string().min(1, "Comment is required"),
    }),
    params: z.object({
        id: z.string(),
    }),
});
//# sourceMappingURL=review.validator.js.map
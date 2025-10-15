import z from "zod";
export declare const VReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        rating: z.ZodNumber;
        comment: z.ZodString;
    }, z.z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=review.validator.d.ts.map
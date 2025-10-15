import z from "zod";
export declare const VVideoSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        videoUrl: z.ZodString;
        duration: z.ZodNumber;
        isFree: z.ZodDefault<z.ZodBoolean>;
    }, z.z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=video.validator.d.ts.map
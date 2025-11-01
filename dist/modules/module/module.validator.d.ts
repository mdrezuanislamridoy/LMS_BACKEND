import z from "zod";
export declare const VModuleSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        isLive: z.ZodDefault<z.ZodBoolean>;
    }, z.z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=module.validator.d.ts.map
import z from "zod";
export declare const VModuleSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        isLive: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=module.validator.d.ts.map
import z from "zod";
export declare const VEnrollmentSchema: z.ZodObject<{
    body: z.ZodObject<{
        phone: z.ZodString;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const VUpdateEnrollmentSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodDefault<z.ZodEnum<{
            pending: "pending";
            paid: "paid";
            cancelled: "cancelled";
        }>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=enrollment.validator.d.ts.map
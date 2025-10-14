import z from "zod";
export declare const couponSchema: z.ZodObject<{
    body: z.ZodObject<{
        code: z.ZodString;
        courses: z.ZodArray<z.ZodString>;
        discount: z.ZodNumber;
        discountType: z.ZodEnum<{
            amount: "amount";
            percentage: "percentage";
        }>;
        minSpend: z.ZodNumber;
        maxDiscount: z.ZodNumber;
        expiresIn: z.ZodDate;
        isActive: typeof z.boolean;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=coupon.validator.d.ts.map
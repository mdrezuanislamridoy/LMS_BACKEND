import z from "zod";
export declare const studentSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        verificationCode: z.ZodNumber;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=student.validator.d.ts.map
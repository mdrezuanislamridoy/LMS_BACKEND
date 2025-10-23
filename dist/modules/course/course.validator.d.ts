import { z } from "zod";
export declare const VCourseSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        batchNo: z.ZodDefault<z.ZodNumber>;
        live: z.ZodDefault<z.ZodBoolean>;
        introVideo: z.ZodOptional<z.ZodString>;
        includedInThisCourse: z.ZodDefault<z.ZodArray<z.ZodString>>;
        about: z.ZodString;
        forWhom: z.ZodDefault<z.ZodArray<z.ZodString>>;
        price: z.ZodNumber;
        isFree: z.ZodDefault<z.ZodBoolean>;
        discount: z.ZodDefault<z.ZodNumber>;
        category: z.ZodString;
        whatYouWillLearn: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type TCourseSchema = z.infer<typeof VCourseSchema>["body"];
//# sourceMappingURL=course.validator.d.ts.map
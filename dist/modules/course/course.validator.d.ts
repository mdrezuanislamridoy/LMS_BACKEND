import z from "zod";
export declare const VCourseSchema: z.ZodObject<{
    body: {
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
        quiz: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    };
    params: {
        id: z.ZodString;
    };
}, z.z.core.$strip>;
//# sourceMappingURL=course.validator.d.ts.map
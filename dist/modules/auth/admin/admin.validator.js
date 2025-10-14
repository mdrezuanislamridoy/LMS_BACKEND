import z from "zod";
export const adminSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be atleast 3 character"),
        email: z.string().email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 character")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number, and special character"),
    }),
});
//# sourceMappingURL=admin.validator.js.map
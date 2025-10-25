import createHttpError from "http-errors";
import { ZodError, ZodType } from "zod";
export const validation = (schema) => {
    return (req, res, next) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            req.body = parsed.body ?? req.body;
            req.params = parsed.params ?? req.params;
            req.query = parsed.query ?? req.query;
            next();
        }
        catch (err) {
            if (err instanceof ZodError) {
                const message = err.issues.map((e) => e.message).join(", ");
                return next(createHttpError(400, message));
            }
            next(createHttpError(400, String(err)));
        }
    };
};
//# sourceMappingURL=Validator.js.map
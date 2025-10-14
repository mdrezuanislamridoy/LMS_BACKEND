import createHttpError from "http-errors";
import { ZodError } from "zod";
import z, {} from "zod/v3";
export const validation = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
        }
        catch (err) {
            if (err instanceof ZodError) {
                const message = err.errors.map((e) => e.message).join(", ");
                return next(createHttpError(400, message));
            }
            next(err);
        }
    };
};
//# sourceMappingURL=Validator.js.map
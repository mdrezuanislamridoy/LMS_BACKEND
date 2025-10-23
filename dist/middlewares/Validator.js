import createHttpError from "http-errors";
import { ZodError } from "zod";
import z from "zod";
export const validation = (schema) => {
    return (req, res, next) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                params: req.params,
            });
            (req.body = parsed.body),
                (req.params = parsed.params);
        }
        catch (err) {
            if (err instanceof ZodError) {
                const message = err.errors.map((e) => e.message).join(", ");
                return next(createHttpError(400, message));
            }
            else {
                next(createHttpError(400, `${err}`));
            }
            next(err);
        }
    };
};
//# sourceMappingURL=Validator.js.map
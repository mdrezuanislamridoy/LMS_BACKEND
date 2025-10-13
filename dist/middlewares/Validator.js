import createHttpError from "http-errors";
export const validation = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body, {
            abortEarly: false,
            errors: { wrap: { label: "" } },
        });
        if (result.error) {
            return next(createHttpError(400, result.error.details.map((err) => err.message)));
        }
        next();
    };
};
//# sourceMappingURL=Validator.js.map
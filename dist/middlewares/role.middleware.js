import createHttpError from "http-errors";
export const checkRole = (...allowedRole) => (req, res, next) => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized: No user found");
    }
    if (!allowedRole.includes(req.user.role)) {
        throw createHttpError(401, "Forbidden: You don't have permission to access this resource");
    }
    next();
};
//# sourceMappingURL=role.middleware.js.map
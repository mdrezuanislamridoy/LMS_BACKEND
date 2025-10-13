export const HandleError = (err, req, res, next) => {
    if (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "An error occurred", success: false });
    }
};
//# sourceMappingURL=handleError.js.map
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { UserModel } from "../modules/auth/user/user.model.js";
import { env } from "../config/env.js";
dotenv.config();
export const User = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        const refreshToken = req.cookies.refreshToken;
        if (!token) {
            if (!refreshToken) {
                return next(createHttpError(401, "Unauthorized"));
            }
            const refreshDecoded = jwt.verify(refreshToken, env.jwt_secret);
            const newAccessToken = jwt.sign({ id: refreshDecoded.id, email: refreshDecoded.role }, env.jwt_secret, { expiresIn: "1h" });
            res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: env.node_env === "production",
                sameSite: env.node_env === "production" ? "none" : "lax",
                maxAge: 60 * 60 * 1000,
            });
            token = newAccessToken;
        }
        const decoded = jwt.verify(token, env.jwt_secret);
        if (!decoded) {
            return next(createHttpError(400, "Not able to fetch data"));
        }
        let user = await UserModel.findById(decoded.id);
        if (!user) {
            return next(createHttpError(404, "User Not Found"));
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.middleware.js.map
import jwt, {} from "jsonwebtoken";
import { env } from "../config/env.js";
export const generateToken = (payload, expiresIn = "1h") => {
    const secret = env.jwt_secret;
    const options = { expiresIn };
    return jwt.sign(payload, secret, options);
};
//# sourceMappingURL=generateToken.js.map
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

interface JwtPayload {
  id: string;
  role: "student" | "mentor" | "admin";
}

export const generateToken = (
  payload: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "1h"
): string => {
  const secret = env.jwt_secret as string;
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, secret, options);
};

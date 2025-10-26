import { type SignOptions } from "jsonwebtoken";
interface JwtPayload {
    id: string;
    role: "student" | "mentor" | "admin";
}
export declare const generateToken: (payload: JwtPayload, expiresIn?: SignOptions["expiresIn"]) => string;
export {};
//# sourceMappingURL=generateToken.d.ts.map
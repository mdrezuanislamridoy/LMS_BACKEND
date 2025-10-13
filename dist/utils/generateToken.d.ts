interface JwtPayload {
    id: string;
    role: "student" | "mentor" | "admin";
}
export declare const generateToken: (payload: JwtPayload, expiresIn?: string | number) => string;
export {};
//# sourceMappingURL=generateToken.d.ts.map
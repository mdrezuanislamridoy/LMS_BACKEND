import type { Request } from "express";
export declare const mentorService: {
    SCreateMentor: (req: Request) => Promise<import("mongoose").Document<unknown, {}, import("../user/user.interface.js").IUser & import("./mentor.interface.js").IMentor, {}, {}> & import("../user/user.interface.js").IUser & import("./mentor.interface.js").IMentor & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=mentor.service.d.ts.map
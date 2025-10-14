import type { Request } from "express";
export declare const SVideo: {
    SAddVideo: (req: Request) => Promise<{
        success: boolean;
        message: string;
        video: import("mongoose").Document<unknown, {}, import("./video.interface.js").IVideo, {}, import("mongoose").DefaultSchemaOptions> & import("./video.interface.js").IVideo & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
};
//# sourceMappingURL=video.service.d.ts.map
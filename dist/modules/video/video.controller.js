import { SVideo } from "./video.service.js";
export const addVideo = async (req, res, next) => {
    try {
        const result = await SVideo.SAddVideo(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=video.controller.js.map
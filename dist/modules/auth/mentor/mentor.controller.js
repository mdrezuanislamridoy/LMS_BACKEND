import createHttpError from "http-errors";
import { mentorService } from "./mentor.service.js";
export const createMentor = async (req, res, next) => {
    try {
        const newMentor = await mentorService.SCreateMentor(req);
        if (!newMentor) {
            return next(createHttpError(400, "Failed To Create Mentor"));
        }
        res.status(201).json({
            message: "Mentor Account Creation Request Successful. Please wait for verification",
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=mentor.controller.js.map
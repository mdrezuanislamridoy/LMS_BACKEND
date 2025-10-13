import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/sendMail.js";
import { UserModel } from "../user/user.model.js";
const SCreateMentor = async (payload, next) => {
    const mentor = await UserModel.findOne({ email: payload.email });
    if (mentor) {
        return next(createHttpError(400, "Account Already Exists"));
    }
    const hashedPass = await bcrypt.hash(payload.password, 10);
    return await UserModel.create({
        ...payload,
        password: hashedPass,
        role: "mentor",
        mentorStatus: "pending",
    });
};
export const mentorService = {
    SCreateMentor,
};
//# sourceMappingURL=mentor.service.js.map
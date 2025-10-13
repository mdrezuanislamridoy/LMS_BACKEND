import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { env } from "../config/env.js";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.gmail_user,
        pass: env.gmail_pass,
    },
});
export const sendMail = async (email, subject, html) => {
    const mailerOption = {
        from: "BAC_Commerce",
        to: email,
        subject,
        html,
    };
    return transporter.sendMail(mailerOption);
};
//# sourceMappingURL=sendMail.js.map
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

interface SendMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (
  email: string,
  subject: string,
  html: string
) => {
  const mailerOption: SendMailOptions = {
    from: "BAC_Commerce",
    to: email,
    subject,
    html,
  };

  return transporter.sendMail(mailerOption);
};

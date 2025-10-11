import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CNAME || "",
  api_key: process.env.CAPI_KEY || "",
  api_secret: process.env.CAPI_SECRET || "",
});

export default cloud;

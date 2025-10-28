import mongoose from "mongoose";
import { env } from "./env.js";

export const db = async () => {
    try {
        await mongoose.connect(env.db_url as string);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};


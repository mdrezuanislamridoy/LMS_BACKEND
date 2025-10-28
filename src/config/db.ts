import mongoose from "mongoose";
import { env } from "./env.js";

export const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mdrezuanislamridoy:RRRidoy781@rrcluster.dzwno.mongodb.net/RR_LMS?retryWrites=true&w=majority&appName=RRCluster"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

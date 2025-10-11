import { Schema } from "mongoose";
import { UserModel } from "../user.model.js";
import type { IMentor } from "./mentor.interface.js";

const MentorSchema = new Schema<IMentor>({});

export const Mentor = UserModel.discriminator("mentor", MentorSchema);

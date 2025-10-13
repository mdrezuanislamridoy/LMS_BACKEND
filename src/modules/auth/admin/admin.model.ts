import { Schema } from "mongoose";
import type { IUser } from "../user/user.interface.js";
import { UserModel } from "../user/user.model.js";

const adminSchema = new Schema<IUser>({});

export const Admin = UserModel.discriminator("admin", adminSchema);

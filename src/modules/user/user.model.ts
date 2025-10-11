import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type {
  ProfileImg,
  Social,
  Contact,
  User,
} from "./baseUser.interface.js";

const Contact = new Schema<Contact>({});
const Social = new Schema<Social>({});
const ProfileImg = new Schema<ProfileImg>({});

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: String,
    email: { type: String, required: true, unique: true },
    contactInfo: Contact,
    socialAccounts: Social,
    profileImg: ProfileImg,
    password: { type: String, required: true },
    profession: String,
    isPasswordChanged: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      required: true,
    },

    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { discriminatorKey: "roleKey", timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

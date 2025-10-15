import mongoose, { Schema } from "mongoose";
import type { ProfileImg, Social, Contact, IUser } from "./user.interface.js";

const ContactInfo = new Schema<Contact>({});
const SocialInfo = new Schema<Social>({});
const ProfileImage = new Schema<ProfileImg>({});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dateOfBirth: Date,
    email: { type: String, required: true, unique: true },
    contactInfo: ContactInfo,
    socialAccounts: SocialInfo,
    profileImg: ProfileImage,
    password: { type: String, required: true },
    profession: String,
    isPasswordChanged: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["student", "mentor", "admin"],
      required: true,
    },
    mentorStatus: {
      type: String,
      enum: ["yes", "no", "pending"],
      default: "pending",
    },

    refreshToken: {
      type: String,
    },

    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { discriminatorKey: "roleKey", timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);

import type { Document } from "mongoose";

type UserRole = "student" | "mentor" | "admin";
type Gender = "male" | "female" | "others";

export interface Contact {
  contactNo?: string;
  emergencyContact?: string;
  address?: string;
}

export interface Social {
  facebook?: string;
  linkedIn?: string;
  github?: string;
}

export interface ProfileImg {
  imageUrl: string;
  publicId: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  mentorStatus: string;
  dateOfBirth?: Date;
  contactInfo?: Contact;
  socialAccounts?: Social;
  profileImg?: ProfileImg;
  gender?: Gender;
  profession: string;
  isPasswordChanged?: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import mongoose, { Schema } from "mongoose";
const ContactInfo = new Schema({});
const SocialInfo = new Schema({});
const ProfileImage = new Schema({});
const userSchema = new Schema({
    name: { type: String, required: true, index: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: Date,
    email: { type: String, required: true, unique: true, index: true },
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
        index: true,
    },
    mentorStatus: {
        type: String,
        enum: ["yes", "no", "pending", "rejected"],
        default: "pending",
    },
    refreshToken: {
        type: String,
    },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, {
    discriminatorKey: "roleKey",
    timestamps: true,
});
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ mentorStatus: 1 });
userSchema.index({ isDeleted: 1 });
userSchema.index({ isBlocked: 1 });
export const UserModel = mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map
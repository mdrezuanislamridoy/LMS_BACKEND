import { Schema } from "mongoose";
import { UserModel } from "../user/user.model.js";
const adminSchema = new Schema({});
export const Admin = UserModel.discriminator("admin", adminSchema);
//# sourceMappingURL=admin.model.js.map
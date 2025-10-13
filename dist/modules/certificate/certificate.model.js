import { model, Schema } from "mongoose";
const CertificateSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    },
});
export const Certificate = model("Certificate", CertificateSchema);
//# sourceMappingURL=certificate.model.js.map
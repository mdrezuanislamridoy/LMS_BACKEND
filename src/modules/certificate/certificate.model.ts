import { model, Schema } from "mongoose";
import type { ICertificate } from "./certificate.interface.js";

const CertificateSchema = new Schema<ICertificate>({
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

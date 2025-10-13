import type { Types } from "mongoose";

export interface ICertificate {
  student: Types.ObjectId;
  course: Types.ObjectId;
  enrollment: Types.ObjectId;
  certificateId: string;
  issuedAt: Date;
}

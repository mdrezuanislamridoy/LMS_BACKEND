import type { Types } from "mongoose";

export interface IModules {
  title: string;
  content?: Types.ObjectId[];
  isLive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

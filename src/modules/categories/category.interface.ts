import type { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: {
    iconUrl: String;
    iconPublicId: String;
  };
}

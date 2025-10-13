import type { Document } from "mongoose";
export interface ICategory extends Document {
    name: string;
    icon: {
        iconUrl: String;
        iconPublicId: String;
    };
}
//# sourceMappingURL=category.interface.d.ts.map
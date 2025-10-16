import { Document, Schema } from "mongoose";
export interface IVerifyCode extends Document {
    email: string;
    verificationCode: number;
    verified: boolean;
    createdAt?: Date;
}
export declare const VerifyCode: import("mongoose").Model<IVerifyCode, {}, {}, {}, Document<unknown, {}, IVerifyCode, {}, import("mongoose").DefaultSchemaOptions> & IVerifyCode & Required<{
    _id: unknown;
}> & {
    __v: number;
}, Schema<IVerifyCode, import("mongoose").Model<IVerifyCode, any, any, any, Document<unknown, any, IVerifyCode, any, {}> & IVerifyCode & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IVerifyCode, Document<unknown, {}, import("mongoose").FlatRecord<IVerifyCode>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IVerifyCode> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>>;
//# sourceMappingURL=verificationCode.model.d.ts.map
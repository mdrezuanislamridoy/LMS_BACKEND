import type { Request } from "express";
export declare const SCoupon: {
    SCreateCoupon: (req: Request) => Promise<{
        success: boolean;
        message: string;
        coupon: import("mongoose").Document<unknown, {}, import("./coupon.interface.js").ICoupon, {}, import("mongoose").DefaultSchemaOptions> & import("./coupon.interface.js").ICoupon & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SUpdateCoupon: (req: Request) => Promise<{
        success: boolean;
        message: string;
        coupon: import("mongoose").Document<unknown, {}, import("./coupon.interface.js").ICoupon, {}, import("mongoose").DefaultSchemaOptions> & import("./coupon.interface.js").ICoupon & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    SDeleteCoupon: (req: Request) => Promise<{
        success: boolean;
        message: string;
    }>;
};
//# sourceMappingURL=coupon.service.d.ts.map
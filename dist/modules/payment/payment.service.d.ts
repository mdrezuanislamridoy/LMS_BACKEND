import type { Request } from "express";
export declare const SPayBill: (req: Request) => Promise<{
    url: any;
    tran_id: string;
    message: string;
    success?: never;
} | {
    success: boolean;
    message: any;
    url?: never;
    tran_id?: never;
}>;
export declare const SPayment: {
    SPayBill: (req: Request) => Promise<{
        url: any;
        tran_id: string;
        message: string;
        success?: never;
    } | {
        success: boolean;
        message: any;
        url?: never;
        tran_id?: never;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map
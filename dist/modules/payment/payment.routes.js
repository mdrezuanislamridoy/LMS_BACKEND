import { Router } from "express";
import { canceled, payBill, success } from "./payment.controller.js";
import { fail } from "assert";
import { User } from "../../middlewares/user.middleware.js";
const router = Router();
router.post("/payBill/:id", User, payBill);
router.post("/success/:id", success);
router.post("/fail/:id", fail);
router.post("/cancel/:id", canceled);
export const PaymentRouter = router;
//# sourceMappingURL=payment.routes.js.map
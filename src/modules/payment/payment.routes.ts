import { Router } from "express";

import { canceled, payBill, success } from "./payment.controller.js";
import { fail } from "assert";
import { User } from "../../middlewares/user.middleware.js";
const router = Router();

router.post("/payBill/:id", User, payBill);
router.post("/success/:id", User, success);
router.post("/fail/:id", User, fail);
router.post("/cancel/:id", User, canceled);

export const PaymentRouter = router;

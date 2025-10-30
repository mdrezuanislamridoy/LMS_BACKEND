import { Router } from "express";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { addCoupon, deleteCoupon, updateCoupon } from "./coupon.controller.js";
const router = Router();
router.get("/coupons", User, checkRole("admin"));
router.post("/addCoupon", User, checkRole("admin"), addCoupon);
router.put("/updateCoupon", User, checkRole("admin"), updateCoupon);
router.delete("/deleteCoupon", User, checkRole("admin"), deleteCoupon);
export const CouponRouter = router;
//# sourceMappingURL=coupon.routes.js.map
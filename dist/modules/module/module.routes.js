import { Router } from "express";
import { validation } from "../../middlewares/Validator.js";
import { VModuleSchema } from "./module.validator.js";
import { createModule } from "./module.controller.js";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
const router = Router();
router.post("/addModule/:id", User, checkRole("admin", "mentor"), 
// validation(VModuleSchema),
createModule);
router.post("/updateModule/:id", User, checkRole("admin", "mentor"), validation(VModuleSchema), createModule);
router.post("/deleteModule/:id", User, checkRole("admin", "mentor"), createModule);
export const ModuleRoutes = router;
//# sourceMappingURL=module.routes.js.map
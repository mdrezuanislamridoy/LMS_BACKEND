import { Router } from "express";
import { validation } from "../../middlewares/Validator.js";
import { VModuleSchema } from "./module.validator.js";
const router = Router();
router.post("/addModules/:id", validation(VModuleSchema));
export const ModuleRoutes = router;
//# sourceMappingURL=module.routes.js.map
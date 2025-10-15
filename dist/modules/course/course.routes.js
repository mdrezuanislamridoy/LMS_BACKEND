import { Router } from "express";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { upload } from "../../utils/multer.js";
import { validation } from "../../middlewares/Validator.js";
import { VCourseSchema } from "./course.validator.js";
import { courseController } from "./course.controller.js";
const router = Router();
router.get("/all-courses", (req, res) => {
    res.send("Hello TypeScript + Node + Express + Mongo!");
});
router.post("/create-course", User, checkRole("admin"), upload.single("thumbnail"), validation(VCourseSchema), courseController.createCourse);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getSingleCourse);
router.put("/update/:id", User, checkRole("admin"), courseController.updateCourse);
router.put("/delete/:id", User, checkRole("admin"), courseController.deleteCourse);
export const CourseRoutes = router;
//# sourceMappingURL=course.routes.js.map
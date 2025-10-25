import { Router } from "express";
import { User } from "../../middlewares/user.middleware.js";
import { checkRole } from "../../middlewares/role.middleware.js";
import { upload } from "../../utils/multer.js";
import { validation } from "../../middlewares/Validator.js";
import { VCourseSchema } from "./course.validator.js";
import { createCourse, deleteCourse, getCourses, getFeaturedCourses, getSingleCourse, updateCourse, } from "./course.controller.js";
const router = Router();
router.post("/create-course", User, checkRole("admin"), upload.single("thumbnail"), createCourse);
// validation(VCourseSchema),
router.get("/get-courses", getCourses);
router.get("/get-popular-courses", getCourses);
router.get("/get-featured-courses", getFeaturedCourses);
router.get("/:id", getSingleCourse);
router.put("/update/:id", User, checkRole("admin"), updateCourse);
router.put("/delete/:id", User, checkRole("admin"), deleteCourse);
export const CourseRoutes = router;
//# sourceMappingURL=course.routes.js.map
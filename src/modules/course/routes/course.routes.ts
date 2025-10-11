import { Router, type Request, type Response } from "express";
import { courseController } from "../controllers/course.controller.js";

import { Admin } from "../../../middlewares/Admin.js";
import { validation } from "../../../middlewares/Validator.js";
import { VCourseSchema } from "../validator/course.validator.js";
import { upload } from "../../../utils/multer.js";
const router = Router();

router.get("/all-courses", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Node + Express + Mongo!");
});

router.post(
  "/create-course",
  Admin,
  upload.single("image"),
  validation(VCourseSchema),
  courseController.createCourse
);

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getSingleCourse);
router.put("/update/:id", Admin, courseController.updateCourse);
router.put("/delete/:id", Admin, courseController.deleteCourse);

export const CourseRoutes = router;

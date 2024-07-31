import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addCourse,getCourses } from "../controllers/course.controllers.js";

const router = Router()

router.route("/addCourse").post(verifyJWT,addCourse);
router.route("/getCourses").get(verifyJWT,getCourses);

export default router;

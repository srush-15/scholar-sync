import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addCourse } from "../controllers/course.controllers.js";

const router = Router()

router.route("/addCourse").post(verifyJWT,addCourse);

export default router;

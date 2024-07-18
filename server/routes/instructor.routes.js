import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addInstructor } from "../controllers/instructor.controllers.js";

const router = Router()

router.route("/addInstructor").post(verifyJWT,addInstructor);

export default router;

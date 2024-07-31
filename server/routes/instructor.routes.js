import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addInstructor , getInstructors} from "../controllers/instructor.controllers.js";

const router = Router()

router.route("/addInstructor").post(verifyJWT,addInstructor);
router.route("/getInstructors").get(verifyJWT,getInstructors);

export default router;

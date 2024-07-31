import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addDepartment , getDepartments} from "../controllers/department.controllers.js";

const router = Router()

router.route("/addDepartment").post(verifyJWT,addDepartment);
router.route("/getDepartments").get(verifyJWT,getDepartments);

export default router;
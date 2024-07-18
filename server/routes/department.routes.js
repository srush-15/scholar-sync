import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addDepartment } from "../controllers/department.controllers.js";

const router = Router()

router.route("/addDepartment").post(verifyJWT,addDepartment);

export default router;
import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addSection } from "../controllers/section.controllers.js";

const router = Router()

router.route("/addSection").post(verifyJWT,addSection);

export default router;

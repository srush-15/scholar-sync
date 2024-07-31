import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addSection,getSections } from "../controllers/section.controllers.js";

const router = Router()

router.route("/addSection").post(verifyJWT,addSection);
router.route("/getSections").get(verifyJWT,getSections);

export default router;

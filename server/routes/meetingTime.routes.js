import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addMeetingTime } from "../controllers/meetingTime.controllers.js";

const router = Router()

router.route("/addMeetingTime").post(verifyJWT,addMeetingTime);

export default router;

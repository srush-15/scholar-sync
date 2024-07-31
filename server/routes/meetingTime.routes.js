import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addMeetingTime ,getMeetingTimes } from "../controllers/meetingTime.controllers.js";

const router = Router()

router.route("/addMeetingTime").post(verifyJWT,addMeetingTime);
router.route("/getMeetingTimes").get(verifyJWT,getMeetingTimes);

export default router;

import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addRoom } from "../controllers/room.controllers.js";

const router = Router()

router.route("/addRoom").post(verifyJWT,addRoom);

export default router;

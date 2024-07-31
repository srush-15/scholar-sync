import Router from "express"
import verifyJWT from "../middlewares/auth.middleware.js"
import { addRoom, getRooms } from "../controllers/room.controllers.js";

const router = Router()

router.route("/addRoom").post(verifyJWT,addRoom);
router.route("/getRooms").get(verifyJWT,getRooms);

export default router;

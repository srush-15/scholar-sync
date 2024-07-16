import Router from "express";
import { registerUser, loginUser,logoutUser, refreshAccessToken } from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refreshToken").post(refreshAccessToken);

router.route("/logout").post(verifyJWT,logoutUser);

export default router;

import jwt from "jsonwebtoken";
import { User } from "../db/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(401).send("No token exists");
      return;
    }
    const tokenPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(tokenPayload._id).select(
      "-password -refreshToken"
    );
    req.user = user;
    next();
  } catch (error) {
    console.log("Failed to verify token ", error);
    res.status(401).json(new ApiResponse(false, {}, "Unauthorized request"));
  }
};
export default verifyJWT;

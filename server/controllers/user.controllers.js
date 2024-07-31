import { User } from "../db/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
const options = {
  httpOnly: true,
  secure: true,
};
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const existedUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existedUser) {
      res
        .status(400)
        .json(
          new ApiResponse(
            false,
            {},
            "User with this email or username already exists"
          )
        );
      return;
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    // though we dont have refresh token at this moment just for consistency I wrote it
    const userData = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!userData) {
      res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to register user"));
      return;
    }
    res
      .status(200)
      .json(new ApiResponse(true, userData, "User registered successfully"));
  } catch (error) {
    console.log("An error happened while registering user", error);
    res.status(500).json(new ApiResponse(false, {}, "Failed to register user"));
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json(new ApiResponse(false, {}, "User does not exist"));
      return;
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      res.status(401).json(new ApiResponse(false, {}, "Incorrect Password"));
      return;
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          true,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User login successful"
        )
      );
  } catch (error) {
    console.log("An error happened while signing in user", error);
    res.status(500).json(new ApiResponse(false, {}, "Failed to login user"));
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true, select: "-password -refreshToken" }
    );
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(true, {}, "User logged out successfully"));
  } catch (error) {
    console.log("An error happened while signing out user", error);
    res.status(500).json(new ApiResponse(false, {}, "Failed to sign out user"));
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(404).json(new ApiResponse(false, {}, "No refresh token"));
      return;
    }
    const tokenPayload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(tokenPayload._id);
    if(!user || user.refreshToken !== token){
      res
        .status(401)
        .clearCookie("refreshToken", options)
        .json(
          new ApiResponse(false, {}, "Unauthorized request")
        );
      return;
    }
    // refresh token rotation
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(true, {}, "Token generated successfully"));
  } catch (error) {
    console.log("Failed to verify token ", error);
    res.status(401).json(new ApiResponse(false, {}, "Unauthorized request"));
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };

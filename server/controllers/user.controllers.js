import { User } from "../db/user.model.js";

const registerUser = async (req,res) => {
    try {
        const {username , email , password} = req.body
        if(!username || !email || !password){
            res.status(400).send("All fields are required")
            return;
        }
        const existedUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if(existedUser){
            res.status(400).send("User with this email or username already exists")
            return;
        }
        const user = await User.create({
            username,email,password
        })
        
        // though we dont have refresh token at this moment just for consistency I wrote it
        const userData = await User.findById(user._id).select("-password -refreshToken");
        if(!userData){
            res.status(500).send("Something went wrong while registering the user")
            return;
        }
        res.status(200).json({"message":"User registered successfully",userData})

    } catch (error) {
        console.log("An error happened while registering user",error)
    }
};

const loginUser = async (req,res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            res.status(400).send("All fields are required")
            return;
        }
        const user = await User.findOne({username});
        if(!user){
            res.status(404).send("User does not exist")
            return;
        }
        const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            res.status(401).send("Incorrect Password")
            return;
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        res.status(200).cookie("accessToken",accessToken, {
            httpOnly: true,
            secure: true,
          }).cookie("refreshToken",refreshToken, {
            httpOnly: true,
            secure: true,
          }).
        json({
            "message":"User login successful",
            "data" :{
                user: loggedInUser,
                accessToken,
                refreshToken,
            },
        })
    } catch (error) {
        console.log("An error happened while registering user",error)
    }
};

export { registerUser, loginUser };

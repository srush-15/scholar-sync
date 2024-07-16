import express from "express";
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
);

app.use(cookieParser())

app.use(express.json());

app.use("/api/v1/users",userRouter);

export default app;

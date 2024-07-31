import express from "express";
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import departmentRouter from "./routes/department.routes.js"
import roomRouter from "./routes/room.routes.js"
import sectionRouter from "./routes/section.routes.js"
import courseRouter from "./routes/course.routes.js"
import instructorRouter from "./routes/instructor.routes.js"
import meetingRouter from "./routes/meetingTime.routes.js"
import cookieParser from "cookie-parser";
import sanitizeData from "./middlewares/sanitize.middleware.js";
const app = express();

app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
);

app.use(cookieParser())

app.use(express.json());

app.use(sanitizeData)

app.use("/api/v1/users",userRouter);

app.use("/api/v1/departments",departmentRouter);

app.use("/api/v1/rooms",roomRouter);

app.use("/api/v1/sections",sectionRouter);

app.use("/api/v1/courses",courseRouter);

app.use("/api/v1/instructors",instructorRouter);

app.use("/api/v1/meetings",meetingRouter);

export default app;

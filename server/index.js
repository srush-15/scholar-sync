import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`An error occured while starting the app ,${error}`);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running at port :${
          process.env.PORT ? process.env.PORT : 8000
        }`
      );
    });
  })
  .catch((error) => {
    console.log("Monog DB connection failed ", error);
  });

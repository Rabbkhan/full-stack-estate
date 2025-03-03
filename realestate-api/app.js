import express from "express";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, credentials:true
}))
app.use(express.urlencoded({ extended: true })); // Parse form data

// app.use("/api/test", (req, res) => {
//   res.send("Hello brother!");
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/test", testRoute);





app.listen(5000, () => {
  console.log("Server is running!");
});

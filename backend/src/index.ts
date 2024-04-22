import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import rootRouter from "./routes";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const MONGO_URI = process.env.URI;
if (!MONGO_URI) {
  throw new Error("Database URI not provided");
}
const PORT = process.env.PORT || 3000;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));
// mongoose.connect(
//   "mongodb+srv://vamsikrishna:krishnamongodb@krdb.notjpqi.mongodb.net/BasicSignupApp"
// );
app.use("/api/v1", rootRouter);

app.listen(PORT, () => console.log("Server Running......"));

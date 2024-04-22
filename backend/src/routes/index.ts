import express from "express";
import { Types } from "mongoose";
import userRoute from "./user";
const rootRouter = express.Router();
export interface IAuthRequest extends Request {
  userId?: Types.ObjectId;
}
rootRouter.use("/user", userRoute);

export default rootRouter;

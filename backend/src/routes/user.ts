import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { z } from "zod";
import { comparePassword, hashPassword } from "../auth";
import { JWT_SECRET_KEY } from "../config";
import User from "../db";
import { authMiddlware } from "./midddleware";

const userRoute = express.Router();
const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  password: z.string(),
});

userRoute.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      success: false,
      msg: "Input Validation failed",
    });
  }
  const isExistingUser = await User.findOne({
    email: req.body.email,
  });
  if (isExistingUser) {
    return res.json({
      success: false,
      msg: "User with email address already exist",
    });
  }
  const hashedPassword = await hashPassword(req.body.password);
  const newUser = await User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    password: hashedPassword,
  });
  if (!newUser) {
    return res.json({
      success: false,
      msg: "Internal Server Error",
    });
  }
  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET_KEY
  );

  return res.cookie("token", token).json({
    msg: "User Created Sucessfully",
    success: true,
    token: token,
  });
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

userRoute.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      success: false,
      msg: "Input Validation failed",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  }).select("+password +_id");
  if (!user) {
    return res.json({
      success: false,
      msg: "Email doesn't Exist",
    });
  }

  const isValidated = await comparePassword({
    password: req.body.password,
    hash: user.password,
  });
  if (!isValidated) {
    return res.json({
      success: false,
      msg: "password does not match",
    });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
  return res.cookie("token", token).json({
    success: true,
    msg: "user successfully loged in",
    token: token,
  });
});

interface ICustomRequest extends Request {
  userId?: Types.ObjectId;
}
userRoute.get(
  "/bulkUsers",
  authMiddlware,
  async (req: ICustomRequest, res: Response) => {
    const bulkUsers = await User.find({ _id: { $ne: req.userId } }).select(
      "-_id firstName lastName email"
    );
    if (!bulkUsers) {
      return res.json({
        success: false,
        msg: "Users not found",
      });
    }
    res.json({
      success: true,
      users: bulkUsers,
      msg: "Users fetched successfully",
    });
  }
);

export default userRoute;

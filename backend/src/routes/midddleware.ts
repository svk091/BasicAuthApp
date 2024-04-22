import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_SECRET_KEY } from "../config";
interface IAuthRequest extends Request {
  userId?: Types.ObjectId;
}
interface IDecodedType extends JwtPayload {
  userId?: Types.ObjectId;
}

interface IAuthRequest extends Request {
  userId?: Types.ObjectId;
}
export function authMiddlware(
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.json({
      success: false,
      msg: "No token detected",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded: IDecodedType = jwt.verify(
      token,
      JWT_SECRET_KEY
    ) as IDecodedType;
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.json({
      success: false,
      msg: "Authorization error",
    });
  }
}

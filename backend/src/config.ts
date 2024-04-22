import dotenv from "dotenv";
dotenv.config();
const KEY = process.env.JWT_SECRET_KEY;
if (!KEY) {
  throw new Error("NO JWT KEY");
}
export const JWT_SECRET_KEY = KEY;

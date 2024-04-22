import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;

import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;

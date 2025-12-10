import { Schema, model, type HydratedDocument } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
}

export type UserDoc = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);
export default User;

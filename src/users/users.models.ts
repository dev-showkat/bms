import { Schema, Document, model } from "mongoose";

export interface IUser {
  username: String;
  password: String;
}
interface IUserDocument extends IUser, Document {}

export const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    required: [true, "username is required"],
  },
  password: {
    type: String,
    null: false,
    required: [true, "password is required"],
  },
});

export const userModel = model<IUserDocument>("users", userSchema);

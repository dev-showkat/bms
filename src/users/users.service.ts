import { userModel, IUser } from "./users.models";
import jwt from "jsonwebtoken";
import { compare, genSalt, hash } from "bcryptjs";

export const addUser = async (user: IUser) => {
  try {
    const { username, password } = user;
    const isExists = await userModel.findOne({ username });
    if (isExists?._id || isExists !== null) {
      return {
        status: 409,
        data: { message: "Username Already Exist" },
      };
    }
    const generateSalt = await genSalt(10);
    const hasedPassword = await hash(`${password}`, generateSalt);
    await userModel.create({
      username: username.toLowerCase(),
      password: hasedPassword,
    });
    const token = jwt.sign(
      { username },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: "12h" }
    );
    return {
      status: 201,
      data: {
        message: "Signup success",
        token,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      data: { message: "something went wrong!" },
    };
  }
};

export const getUser = async (user: IUser) => {
  try {
    const { username, password } = user;
    const isExists = await userModel.findOne({ username });
    if (!isExists) {
      return {
        status: 404,
        data: { message: "User not found" },
      };
    } else {
      const isValid = await compare(`${password}`, `${isExists.password}`);
      if (!isValid) {
        return {
          status: 400,
          data: { message: "Invalid password" },
        };
      }
      const token = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET_KEY as string,
        { expiresIn: "12h" }
      );
      return {
        status: 200,
        data: {
          message: "Login success",
          token,
        },
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      data: { message: "something went wrong!" },
    };
  }
};

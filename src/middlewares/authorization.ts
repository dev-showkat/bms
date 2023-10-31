import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../users/users.models";

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const token: string = authorization.split("Bearer ")[1];
    const decodedToken: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    );
    res.locals = {
      ...res.locals,
      username: decodedToken?.username,
    };
    const user = await userModel.findOne({
      username: decodedToken?.username,
    });
    if (!user?._id || user === null)
      return res.status(401).send({
        message: "Unauthorized",
      });
    console.log(`decoded token: ${decodedToken}`);
    return next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }
};

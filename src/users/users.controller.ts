import { Request, Response } from "express";
import { addUser, getUser } from "./users.service";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: `username and password are requied`,
      });
    }
    const response = await addUser({ username, password });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        message: `username and password are requied`,
      });
    }
    const response = await getUser({ username, password });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

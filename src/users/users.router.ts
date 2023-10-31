import { Router } from "express";
import { signup, login } from "./users.controller";

export const usersRouter = Router();

usersRouter.post("/signup", signup);
usersRouter.post("/login", login);

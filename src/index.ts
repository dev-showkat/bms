import express, { Application, Request, Response, json } from "express";
import cors, { CorsOptions } from "cors";
import { config as dotenvConfig } from "dotenv";
import morgan from "morgan";
import { usersRouter } from "./users/users.router";
import { booksRouter } from "./books/books.router";
import fs from "fs";
import path from "path";
import { connectDB } from "./dbconfig";

dotenvConfig();
connectDB();

const PORT: number = parseInt(process.env.PORT as string) || 3000;
const app: Application = express();

const corsOptions: CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const root: any = path.join(__dirname);
const accessLogStream = fs.createWriteStream(`${root}/access.log`, {
  flags: "a",
});

app.use(cors(corsOptions));
app.use(json());
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "BMS server is running!",
  });
});

app.use("/auth", usersRouter);
app.use("/books", booksRouter);
app.get("/logs", (req: Request, res: Response) => {
  res.status(200).sendFile(`${root}/access.log`, (err) => {
    console.log(err);
  });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Path Not Found!",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});

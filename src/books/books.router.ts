import { Router } from "express";
import { isAuthorized } from "../middlewares/authorization";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "./books.controller";

export const booksRouter = Router();

booksRouter.post("/new", isAuthorized, createBook);
booksRouter.get("/all", isAuthorized, getAllBooks);
booksRouter.put("/update/:id", isAuthorized, updateBook);
booksRouter.delete("/remove/:id", isAuthorized, deleteBook);

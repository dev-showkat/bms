import { Request, Response } from "express";
import { addBook, getBooks, modifyBook, removeBook } from "./books.service";

export const createBook = async (req: Request, res: Response) => {
  let { title, author, summary } = req.body;
  const { username } = res.locals;
  try {
    if (!title?.trim() || !author?.trim() || !summary?.trim()) {
      return res.status(400).json({
        message: "Title, Author, Summary are requied",
      });
    }
    const response = await addBook({
      title,
      author,
      summary,
      createdBy: username,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { username } = res.locals;
    const response = await getBooks({ username });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id?.trim()) {
      return res.status(400).json({
        message: `Book id is required`,
      });
    }
    const response = await modifyBook({ id, book: req.body });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id?.trim()) {
      return res.status(400).json({
        message: `Book id is required`,
      });
    }
    const response = await removeBook({ id });
    res.status(response.status).send(response.data);
  } catch (error: any) {
    res.status(500).send({
      message: "something went wrong!",
    });
  }
};

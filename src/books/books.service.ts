import { IBook, bookModel } from "./books.models";
import { Types } from "mongoose";

const { ObjectId } = Types;
export const addBook = async (book: IBook) => {
  try {
    const newBook = await bookModel.create(book);
    return {
      status: 201,
      data: {
        message: "Book created success",
        book: newBook,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      data: {
        message: "something went wrong!",
      },
    };
  }
};

export const getBooks = async ({ username }: { username: string }) => {
  let books = [];
  try {
    books = await bookModel.find({ createdBy: username });
    return {
      status: 200,
      data: books,
    };
  } catch (error: any) {
    return {
      status: 500,
      data: {
        message: "something went wrong!",
      },
    };
  }
};

export const modifyBook = async ({ id, book }: { id: string; book: IBook }) => {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        status: 400,
        data: {
          message: "Invalid Book id",
        },
      };
    }
    const isExists = await bookModel.findOne({ _id: id });
    if (!isExists?._id || isExists === null) {
      return {
        status: 404,
        data: {
          message: "Book not found",
        },
      };
    }
    await bookModel.updateOne({ _id: id }, book);
    const updatedBook = await bookModel.findById({ _id: id });
    return {
      status: 200,
      data: {
        message: "Book updated",
        book: updatedBook,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      data: {
        message: "something went wrong!",
      },
    };
  }
};

export const removeBook = async ({ id }: { id: string }) => {
  try {
    if (!ObjectId.isValid(id)) {
      return {
        status: 400,
        data: {
          message: "Invalid Book id",
        },
      };
    }
    const isExists = await bookModel.findOne({ _id: id });
    if (!isExists?._id || isExists === null) {
      return {
        status: 404,
        data: {
          message: "Book not found",
        },
      };
    }
    await bookModel.deleteOne({ _id: id });
    return {
      status: 200,
      data: {
        message: "Book removed success!",
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      data: {
        message: "something went wrong!",
      },
    };
  }
};

import { Schema, Document, model } from "mongoose";

export interface IBook {
  title: String;
  author: String;
  summary: String;
  createdBy: String;
  createdAt?: Date;
}
interface IBookDocument extends IBook, Document {}

export const bookSchema = new Schema({
  title: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    required: [true, "title is required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  summary: {
    type: String,
    required: [true, "summary is required"],
  },
  createdBy: {
    type: String,
    required: [true, "username is required"],
  },
  createdAt: { type: Date, default: Date.now },
});

export const bookModel = model<IBookDocument>("books", bookSchema);

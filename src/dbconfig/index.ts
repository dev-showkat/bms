import { connect } from "mongoose";

export const connectDB = async () => {
  if (process.env.URI) {
    connect(process.env.URI, {}, (err) => {
      if (err) console.log(err);
    });
  } else {
    console.log(`MongoDB URI not found`);
    process.exit(1);
  }
};

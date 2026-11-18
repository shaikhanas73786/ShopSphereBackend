import mongoose from "mongoose";

const connectDB = async (dbURL, dbName) => {
  try {
    await mongoose.connect(dbURL + "/" + dbName);
    console.log("Connnected to Database successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;


import mongoose from "mongoose";
import envVariables from "../envConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(envVariables.MONGO_URI!);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);

    process.exit(1);
  }
};

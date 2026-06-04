import mongoose from "mongoose";
export interface IUser extends Document {
  firstname: string;
  lastname?: string;
  pic?: string | null;
  email: string;
  password: string;
  refreshToken: string;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    pic: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
      default: "",
    },
  },
  { timestamps: true },
);
export default mongoose.model<IUser>("users", userSchema);

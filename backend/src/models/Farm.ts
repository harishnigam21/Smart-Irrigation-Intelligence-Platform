import mongoose, { Schema, model, Document } from "mongoose";

export interface IFarm extends Document {
  userId: mongoose.ObjectId;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

const farmSchema = new Schema<IFarm>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    name: {
      type: String,
      required: true,
    },

    location: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Farm = model<IFarm>("Farm", farmSchema);

import mongoose, { Schema, model, Document } from "mongoose";

export interface IFarm extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
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
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);
farmSchema.index({ location: "2dsphere" });
export const Farm = model<IFarm>("Farm", farmSchema);

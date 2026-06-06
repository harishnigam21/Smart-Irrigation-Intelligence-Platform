import mongoose, { Schema, model, Document } from "mongoose";
export const VALID_SOIL_TYPES = [
  "NA",
  "alluvial soil",
  "red soil",
  "black soil (regur)",
  "forest & mountain soil",
  "arid & desert soil",
  "laterite soil",
  "saline & alkaline soil",
  "peaty & marshy soil",
] as const;
export type soilType = (typeof VALID_SOIL_TYPES)[number];
export interface IFarm extends Document {
  userId: mongoose.Types.ObjectId;
  nickName: string;
  info: {
    dimensions: Record<string, number | string> | null;
    shapeType: string | null;
    area: number | null;
    perimeter: number | null;
  };
  soilType: soilType;
  coordinates: [number, number][];
}
const farmSchema = new Schema<IFarm>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    nickName: {
      type: String,
      required: true,
      trim: true,
    },
    //Calculate when farm created through coordinates
    info: {
      // Record<string, string> maps to a Mongoose Map of Strings
      dimensions: {
        type: Map,
        of: String,
        default: null,
      },
      shapeType: {
        type: String,
        default: null,
      },
      area: {
        type: Number,
        default: null,
      },
      perimeter: {
        type: Number,
        default: null,
      },
    },
    coordinates: {
      type: [[Number]],
      required: true,
    },
    soilType: {
      type: String,
      enum: [
        "NA",
        "alluvial soil",
        "red soil",
        "black soil (regur)",
        "forest & mountain soil",
        "arid & desert soil",
        "laterite soil",
        "saline & alkaline soil",
        "peaty & marshy soil",
      ],
      default: "NA",
    },
  },
  {
    timestamps: true,
  },
);
farmSchema.index({ "coordinates.coordinates": "2dsphere" });
export const Farm = model<IFarm>("farms", farmSchema);

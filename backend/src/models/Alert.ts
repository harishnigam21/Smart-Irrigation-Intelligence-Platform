import mongoose, { Schema, model, Document } from "mongoose";

export interface IAlert extends Document {
  sensorId: mongoose.ObjectId;
  farmId: mongoose.ObjectId;
  userId: mongoose.ObjectId;
  type: string;
  status: boolean;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
}
//TODO:Currently getting sensorId, farmId, userId, later you can use nested populate from sensorId only to get this information
const alertSchema = new Schema<IAlert>(
  {
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "sensors",
      index: true,
    },
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "farms",
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
alertSchema.index({
  sensorId: 1,
  createdAt: -1,
});

alertSchema.index({
  type: 1,
});
export const Alert = model<IAlert>("Alert", alertSchema);

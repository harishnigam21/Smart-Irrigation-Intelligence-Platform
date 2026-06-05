import mongoose, { Schema, model, Document } from "mongoose";

export interface ISensor extends Document {
  deviceId: mongoose.Types.ObjectId;
  farmId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  pinNumber: number;
  sensorType: "soil" | "water_flow" | "temperature";
  status: "active" | "inactive";
  lastSeen: Date;
}
//TODO:Currently getting farmId, userId, later you can use nested populate from farmId only to get this information

const sensorSchema = new Schema<ISensor>(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "devices",
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
    },
    pinNumber: {
      type: Number,
      required: true,
    },
    sensorType: {
      type: String,
      enum: ["soil", "water_flow", "temperature"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
sensorSchema.index({ status: 1, deviceId: 1 });
export const Sensor = model<ISensor>("sensors", sensorSchema);

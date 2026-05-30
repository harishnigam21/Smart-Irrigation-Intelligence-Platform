import mongoose, { Schema, model, Document } from "mongoose";

export interface ISensor extends Document {
  userId: mongoose.Types.ObjectId;
  sensorLocalId: string;
  farmId: mongoose.Types.ObjectId;
  sensorType: "soil" | "water_flow" | "temperature";
  status: "active" | "inactive";
  lastSeen: Date;
}
//TODO:Currently getting farmId, userId, later you can use nested populate from farmId only to get this information

const sensorSchema = new Schema<ISensor>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    sensorLocalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "farms",
      index: true,
    },

    sensorType: {
      type: String,
      enum: ["soil", "water_flow", "temperature"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
sensorSchema.index({ status: 1 });
export const Sensor = model<ISensor>("Sensor", sensorSchema);

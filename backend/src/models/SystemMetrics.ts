import mongoose, { Schema, model, Document } from "mongoose";

export interface ISystemMetrics extends Document {
  totalSensors: mongoose.Types.ObjectId[];
  activeSensors: mongoose.Types.ObjectId[];
  totalDevices: mongoose.Types.ObjectId[];
  activeDevices: mongoose.Types.ObjectId[];
  totalFarms: mongoose.Types.ObjectId[];
  activeAlerts: mongoose.Types.ObjectId[];
  averageTemperature: number;
  averageSoilMoisture: number;
  averageWaterFlow: number;
  userId: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const systemMetricsSchema = new Schema<ISystemMetrics>(
  {
    totalSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sensors",
        default: [],
      },
    ],
    activeSensors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sensors",
        default: [],
      },
    ],
    totalDevices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "devices",
        default: [],
      },
    ],
    activeDevices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "devices",
        default: [],
      },
    ],
    totalFarms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fields",
        default: [],
      },
    ],
    activeAlerts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "alerts",
        default: [],
      },
    ],
    averageTemperature: {
      type: Number,
      default: 0,
    },
    averageSoilMoisture: {
      type: Number,
      default: 0,
    },
    averageWaterFlow: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const SystemMetrics = model<ISystemMetrics>(
  "systemmetrics",
  systemMetricsSchema,
);

import mongoose, { Schema, model, Document } from "mongoose";

export interface ISystemMetrics extends Document {
  userId: mongoose.ObjectId;
  totalFields: mongoose.ObjectId[];
  totalSensors: mongoose.ObjectId[];
  activeAlerts: mongoose.ObjectId[];
  averageTemperature: number;
  averageSoilMoisture: number;
  averageWaterFlow: number;
  updatedAt: Date;
}

const systemMetricsSchema = new Schema<ISystemMetrics>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    index: true,
  },
  totalFields: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fields",
      default: [],
    },
  ],
  totalSensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sensors",
      default: [],
    },
  ],

  activeAlerts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sensors",
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

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const SystemMetrics = model<ISystemMetrics>(
  "SystemMetrics",
  systemMetricsSchema,
);

import mongoose, { Schema, model, Document } from "mongoose";

export interface ISensorReading extends Document {
  deviceId: mongoose.Types.ObjectId;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
}
const sensorReadingSchema = new Schema<ISensorReading>(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "devices",
      index: true,
    },

    soilMoisture: {
      type: Number,
      required: true,
    },

    waterFlow: {
      type: Number,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

sensorReadingSchema.index({
  deviceId: 1,
  updatedAt: -1,
});

export const SensorReading = model<ISensorReading>(
  "SensorReading",
  sensorReadingSchema,
);

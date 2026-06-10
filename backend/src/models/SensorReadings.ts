import mongoose, { Schema, model, Document } from "mongoose";

export interface ISensorReading extends Document {
  userId: mongoose.Types.ObjectId;
  deviceId: mongoose.Types.ObjectId;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
  createdAt: Date;
}
const sensorReadingSchema = new Schema<ISensorReading>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "devices",
      index: true,
    },
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
  "sensorreadings",
  sensorReadingSchema,
);

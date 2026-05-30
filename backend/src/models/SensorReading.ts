import mongoose, { Schema, model, Document } from "mongoose";

export interface ISensorReading extends Document {
  sensorId: mongoose.Types.ObjectId;
  sensorLocalId: string;
  timestamp: Date;
  soilMoisture: number;
  waterFlow: number;
  temperature: number;
}

const sensorReadingSchema = new Schema<ISensorReading>(
  {
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "sensors",
      index: true,
    },
    sensorLocalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
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
  sensorId: 1,
  timestamp: -1,
});

export const SensorReading = model<ISensorReading>(
  "SensorReading",
  sensorReadingSchema,
);

import mongoose from "mongoose";
export interface IDevice extends Document {
  farmId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  nickName: string;
  macAddress: string;
  hardware: {
    model: string;
    firmwareVersion: string;
    powerSource: "solar" | "battery" | "grid";
    pinConfiguration: {
      pinNumber: number;
      direction: "INPUT" | "OUTPUT";
      sensors: mongoose.Types.ObjectId;
    }[];
    settings: {
      reportingIntervalInSeconds: number;
      isDeepSleepEnabled: boolean;
    };
    coordinates: [number, number]; // [latitude,longitude]
    telemetrySummary: {
      status: "online" | "offline" | "error";
      lastSeen: Date;
      batteryPercentage: number;
      signalStrengthDbm: number;
    };
  };
  farmPoint: number[] | null;
}
const deviceSchema = new mongoose.Schema<IDevice>(
  {
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "farms",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    nickName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    macAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hardware: {
      model: { type: String, default: "ESP32" },
      firmwareVersion: { type: String, required: true },
      powerSource: {
        type: String,
        enum: ["solar", "battery", "grid"],
        default: "grid",
      },
      pinConfiguration: [
        {
          pinNumber: { type: Number, required: true },
          direction: {
            type: String,
            enum: ["INPUT", "OUTPUT"],
            default: "INPUT",
          },
          sensors: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "sensors",
            required: true,
          },
        },
      ],
      settings: {
        reportingIntervalInSeconds: {
          type: Number,
          default: 600,
        }, // 10 mins
        isDeepSleepEnabled: { type: Boolean, default: false },
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      telemetrySummary: {
        status: {
          type: String,
          enum: ["online", "offline", "error"],
          default: "offline",
        },
        lastSeen: { type: Date, default: Date.now },
        batteryPercentage: { type: Number, min: 0, max: 100, default: 0 },
        signalStrengthDbm: { type: Number }, // RSSI
      },
    },
    farmPoint: {
      type: [Number],
      required: true,
      default: null,
    },
  },
  { timestamps: true },
);
deviceSchema.index({ "hardware.coordinates": "2d", farmId: 1 });
export default mongoose.model<IDevice>("devices", deviceSchema);

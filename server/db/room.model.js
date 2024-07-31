import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);

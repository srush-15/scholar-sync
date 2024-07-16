import mongoose, { Schema } from "mongoose";

const meetingTimeSchema = new Schema(
  {
    timeId: {
      type: String,
      unique: true,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const MeetingTime = mongoose.model("MeetingTime", meetingTimeSchema);

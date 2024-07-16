import mongoose, { Schema } from "mongoose";

const instructorSchema = new Schema(
  {
    instructorId: {
      type: String,
      required: true,
      unique: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Instructor = mongoose.model("Instructor", instructorSchema);

import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
  {
    sectionId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true }
);

export const Section = mongoose.model("Section", sectionSchema);

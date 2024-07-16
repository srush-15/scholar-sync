import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
      },
    ],
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);

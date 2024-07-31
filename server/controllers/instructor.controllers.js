import { ApiResponse } from "../utils/ApiResponse.js";
import { Instructor } from "../db/instructor.model.js";
const addInstructor = async (req, res) => {
  try {
    const { instructorId, instructorName } = req.body;
    if (!instructorId || !instructorName) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const existingInstructor = await Instructor.findOne({ instructorId });

    if (existingInstructor) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "Instructor already exists"));
      return;
    }
    const newInstructor = await Instructor.create({
      instructorId,
      instructorName,
    });
    if (!newInstructor) {
      res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to create new Instructor"));
      return;
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          newInstructor,
          "Instructor registered successfully"
        )
      );
  } catch (error) {
    console.log("An error happened while creating an Instructor ", error);
    res
      .status(500)
      .json(new ApiResponse(false, {}, "Failed to create new Instructor"));
  }
};

const getInstructors = async (req,res)=>{
  try {
    const existingInstructors = await Instructor.find();
    res.status(200).json(new ApiResponse(true,existingInstructors,"Instructors fetched successfully"));
  } catch (error) {
    console.log("An error happened while getting Insturctors ",error);
    res.status(500).json(new ApiResponse(false,{},"Failed to get instructors"))
  }
}

export { addInstructor,getInstructors };

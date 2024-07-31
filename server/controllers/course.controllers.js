import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../db/course.model.js";
import {Instructor} from "../db/instructor.model.js"
const addCourse = async (req, res) => {
  try {
    const { courseId, instructorId, credit, capacity } = req.body;
    if (!courseId || !instructorId || !credit || !capacity) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      res.status(400).json(new ApiResponse(false, {}, "Course already exists"));
      return;
    }
    const course_instructor = await Instructor.findOne({instructorId})
    if (!course_instructor) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "Invalid instructor added"));
      return;
    }
    const newCourse = await Course.create({
      courseId,
      instructor:course_instructor._id,
      credit,
      capacity,
    });
    if (!newCourse) {
      res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to create new course"));
      return;
    }
    res
      .status(200)
      .json(new ApiResponse(true, newCourse, "Course registered successfully"));
  } catch (error) {
    console.log("An error happened while creating the course ", error);
    res
      .status(500)
      .json(new ApiResponse(false, {}, "Failed to create new course"));
  }
};
const getCourses = async(req,res)=>{
  try {
    const existingCourses = await Course.find().populate('instructor');
    res.status(200).json(new ApiResponse(true,existingCourses,"Courses fetched successfully"));
  } catch (error) {
    console.log("An error happened while getting courses ",error);
    res.status(500).json(new ApiResponse(false,{},"Failed to get courses"))
  }
}

export { addCourse,getCourses};

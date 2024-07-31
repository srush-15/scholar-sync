import { ApiResponse } from "../utils/ApiResponse.js";
import { Department } from "../db/department.model.js";
import { Course } from "../db/course.model.js";
const addDepartment = async (req, res) => {
  try {
    const { departmentName, courses } = req.body;
    if (!departmentName || courses.length === 0) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const existingDepartment = await Department.findOne({ departmentName });
    if (existingDepartment) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "Department already exists"));
      return;
    }
    const courseArray = [];
    for (const courseId of courses) {
      const course = await Course.findOne({ courseId });
      if (!course) {
        res
          .status(400)
          .json(new ApiResponse(false, {}, "Invalid Course Added"));
        return;
      }
      courseArray.push(course._id);
    }
    const newDepartment = await Department.create({
      departmentName,
      courses:courseArray,
    });
    if (!newDepartment) {
      res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to create new department"));
      return;
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          true,
          newDepartment,
          "Department registered successfully"
        )
      );
  } catch (error) {
    console.log("An error happened while creating the department ", error);
    res
      .status(500)
      .json(new ApiResponse(false, {}, "Failed to create new department"));
  }
};
const getDepartments = async(req,res)=>{
    try {
      const existingDepartments = await Department.find().populate('courses');
      res.status(200).json(new ApiResponse(true,existingDepartments,"Departments fetched successfully"));
    } catch (error) {
      console.log("An error happened while getting Departments ",error);
      res.status(500).json(new ApiResponse(false,{},"Failed to get departments"))
    }
}
export { addDepartment ,getDepartments };

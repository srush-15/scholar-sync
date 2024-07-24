import { ApiResponse } from "../utils/ApiResponse.js";
import {Section} from "../db/section.model.js"
import {Department} from "../db/department.model.js"
const addSection = async (req,res) => {
    try {
        const {sectionId , department} = req.body;
        if(!sectionId || !department){
            res.status(400).json(new ApiResponse(false,{},"All fields are required"));
            return;
        }
        const existingSection = await Section.findOne({sectionId});
        if(existingSection){
            res.status(400).json(new ApiResponse(false,{},"Section already exists"));
            return;
        }
        const sectionsDepartment = await Department.findOne({departmentName :department})
        if(!sectionsDepartment){
            res.status(400).json(new ApiResponse(false,{},"Department does not exists"));
            return;
        }
        const section = await Section.create({
            sectionId, department:sectionsDepartment._id
        })
        if(!section){
            res.status(500).json(new ApiResponse(false,{},"Failed to create new section"));
            return;
        }
        res.status(200).json(new ApiResponse(true,section,"Section created successfully"));
    } catch (error) {
        console.log("An error happened while creating the section ", error);
        res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to create new section"));
    }
};

export { addSection };

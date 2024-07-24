import { ApiResponse } from "../utils/ApiResponse.js";
import { Room } from "../db/room.model.js"
const addRoom = async (req,res) => {
    try {
        const {roomId,capacity }= req.body; 
        if(!roomId || !capacity){
            res.status(400).json(new ApiResponse(false,{},"All fields are required"));
            return;
        }
        const existingRoom = await Room.findOne({roomId})
        if(existingRoom){
            res.status(400).json(new ApiResponse(false,{},"Room already exists"));
            return;
        }
        const room = await Room.create({
            roomId,capacity
        })
        if(!room){
            res.status(500).json(new ApiResponse(false,{},"Failed to create new room"));
            return;
        }
        res.status(200).json(new ApiResponse(true,room,"Room added successfully"));
    } catch (error) {
        console.log("An error happened while creating the room ", error);
        res
        .status(500)
        .json(new ApiResponse(false, {}, "Failed to create new room"));
    }
};

export { addRoom };

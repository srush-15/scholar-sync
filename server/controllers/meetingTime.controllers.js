import { ApiResponse } from "../utils/ApiResponse.js";
import { MeetingTime } from "../db/meetingTime.model.js";
const addMeetingTime = async (req, res) => {
  try {
    const { timeId, startTime, endTime, day } = req.body;
    if (!timeId || !startTime || !endTime || !day) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "All fields are required"));
      return;
    }
    const existingMeetTiming = await MeetingTime.findOne({ timeId });
    if (existingMeetTiming) {
      res
        .status(400)
        .json(new ApiResponse(false, {}, "Meeting Time already exists"));
      return;
    }
    const meeting = await MeetingTime.create({
      timeId,
      startTime,
      endTime,
      day,
    });
    if(!meeting){
        res.status(500).json(new ApiResponse(false, {}, "Failed to create new meeting time"));
        return
    }
    res.status(200).json(new ApiResponse(true,meeting,"Meeting time successfully created"))
  } catch (error) {
    console.log("An error happened while creating the meeting time", error);
    res
      .status(500)
      .json(new ApiResponse(false, {}, "Failed to create new meeting time"));
  }
};

export { addMeetingTime };

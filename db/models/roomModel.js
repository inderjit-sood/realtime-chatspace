import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  room_name: String,
});

const roomModel = mongoose.model("room", roomSchema);

export default roomModel;

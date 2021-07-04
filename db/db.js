//Import the mongoose module
import mongoose from "mongoose";
import roomModel from "./models/roomModel";

//Set up default mongoose connection
const mongoDB = "mongodb+srv://inder:00000@coolcluster.zsom4.mongodb.net/realtime-chatapp?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }); //default connection

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
});

/* const testRoom = new roomModel({ room_name: "Javascript" });

testRoom.save((err, room) => {
  if (err) console.error(err);
  console.log(room);
}); */

async function createRoom(room_name) {
  let room = await roomModel.findOne({ room_name: room_name });
  console.log(`Requesting DB for room name ${room_name}`);
  console.log(room);
  if (room) {
    console.log("Room already exists! Please create another room...");
    return;
  }
  room = new roomModel({ room_name: room_name });
  room.save((err, room) => {
    if (err) console.error(err);
    console.log(room);
  });
}

async function getRooms() {
  let rooms;
  await roomModel.find({}, (err, rms) => {
    console.log(rms);
    rooms = rms;
  });
  return rooms;
}

export default { createRoom, getRooms };

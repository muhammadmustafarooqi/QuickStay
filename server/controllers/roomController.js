import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// api to create new room for a hotel

// api to get all rooms

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, animities } = req.body;
    const Hotel = await Hotel.findOne({ owner: req.auth.userId });

    // check if hotel is not registered
    const hotel = await Hotel.findOne({ owner });
    if (!hotel) {
      return;
      res.json({ sucess: false, message: "hotel not found" });
    }
    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // wait for all uploads to complete
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      animities: JSON.parse(aminities),
      images,
    });
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.status(200).json({ sucess: false, message: error.message });
  }
};

// api to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailible: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all rooms for a specific hotel

export const getOwnersRooms = async (req , res) => {
    try {
        const hotelData = await Hotel({owner : req.auth.userId})
        const rooms = await Room.find({hotel : hotelData._id.toString()}).populate("hotel")
        res.json({success : true , rooms})
    } catch (error) {
        res.json({success : false , message : error.message})
        
    }
}


// api to toggle availibility of a room
export const toggleRoomAvailibility = async (req, res) => {
    try {
        const {roomId} = req.body
        const roomData = await Room.findById(roomId)
        roomData.isAvailible = !roomData.isAvailible
        await roomData.save()

        res.json({success : true , message : "Room availibility Updated"})
    } catch (error) {
        
        res.json({success : false , message : error.message})
    }
}
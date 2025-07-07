import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Function  to check availibility of the room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate }, // Existing booking starts on or before July 15
      checkOutDate: { $gte: checkInDate }, // Existing booking ends on or after July 10
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
    // res.status(200).json({ sucess: false, message: error.message });
  }
};

// API to check availability of the room
// POST /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ sucess: true, isAvailable });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

// API to create a new booking
// POST /api/bookings/book

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    // before booking check availbility

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      res.json({ sucess: false, message: "room is not available" });
    }
    // get totalprice of the room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;

    // calculate total price based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timediff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil((timediff / 1000) * 3600 * 24);

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({ sucess: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error);

    res.json({ sucess: false, message: "Failed to create booking" });
  }
};

// API to get all bookings for a user
// POST /api/bookings/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ sucess: true, message: bookings });
  } catch (error) {
    console.log(error);

    res.json({ sucess: false, message: "Failed to create booking" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ sucess: false, message: "No Hotel found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    // Total bookings
    const totalBookigs = bookings.length;
    // Total Revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      sucess: true,
      dashboardData: { totalBookigs, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ sucess: false, message: "Failed to fetch bookings" });
  }
};

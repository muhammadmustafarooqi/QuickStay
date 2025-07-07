import { protect } from '../middleware/authMiddleware.js'
import express from 'express'
import upload from '../middleware/uploadMiddleware.js'
import { createRoom, getOwnersRooms, getRooms, toggleRoomAvailibility } from '../controllers/roomController.js'

const roomRouter = express.Router()
roomRouter.post('/', upload.array("images", 4), protect, createRoom );
roomRouter.post('/', getRooms);
roomRouter.post('/owner', protect, getOwnersRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailibility);


export default roomRouter
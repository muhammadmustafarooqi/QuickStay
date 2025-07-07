import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const registerHotel = async(req, res)=>{
    try {
        const {name , address, constact, city} = req.body;
        const owner = req.user._id;

        // check if user already registered
        const hotel = await Hotel.findOne({owner})
        if (hotel) {
            return 
            res.json({sucess: false, message: "hotel already registered"})
            await Hotel.create({name , address, constact, city, owner})
            await User.findIdAndUpdate({owner}, {role : "hotelOwner"})
            res.status(200).json({sucess:true, message : "Hotel registered successfully"})
        }
    } catch (error) {
            res.status(200).json({sucess:false, message : error.message})
    }
}
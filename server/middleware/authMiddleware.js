import { authenticateRequest } from "@clerk/express";
import User from "../models/User.js";
import { messageInRaw } from "svix";

// middleware to check if user is authenticated

export const protect = async (req, res, next)=>{
    const {userId} = req.auth;
    if (!userId) {
        res.json({sucess: false, message: "not authenticated"})
    } else {
        const user = await User.findById(userId)
        req.user = user;
        next()
    }
}
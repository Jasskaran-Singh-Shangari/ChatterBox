import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protectRoute = async (req, res, next)=>{
    console.log("Reached the protected route")

    try {
        const token = req.cookies.jwt;
    
        if(!token)
            return res.status(401).json({
        message: " Unauthorized - No Token Provided "})
    
        // VALIDATE COOKIE -> JWT TOKEN
    
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
        if(!decodedToken)
            return res.status(400).json({
        message: " Unauthorized token - No Token Provided "})
    
        // console.log(decodedToken)
    
        const user = await User.findById(decodedToken.userId).select("-password")
    
        if(!user)
            return res.status(400).json({
        message: "User not found"})
    
        req.user=user;
        console.log("User verified")
    
        next();
    } catch (error) {
        console.log(`ERROR 404: ${error}`)
        return res
        .status(500)
        .json({message: "Internal Server Error!!"})
}
}
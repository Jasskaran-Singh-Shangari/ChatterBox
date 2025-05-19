import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protectRoute = async (req, res, next)=>{

    try {
        const token = req.cookies.jwt;
    
        if(!token)
            res.status(401).json({
        message: " Unauthorized - No Token Provided "})
    
        // VALIDATE COOKIE -> JWT TOKEN
    
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    
        if(!decodedToken)
            res.status(400).json({
        message: " Unauthorized token - No Token Provided "})
    
        // console.log(decodedToken)
    
        const user = await User.findById(decodedToken.userId).select("-password")
    
        if(!user)
            res.status(400).json({
        message: "User not found"})
    
        req.user=user;
    
        next();
    } catch (error) {
        console.log(`ERROR 404: ${error}`)
        res.status(500).json({message: "Internal Server Error"})

}
}
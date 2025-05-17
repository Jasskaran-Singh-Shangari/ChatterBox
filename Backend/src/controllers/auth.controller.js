import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async(req, res)=>{
    const {username, email, password}=req.body;

    if(!username || !email || !password){
        res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        if (password.length < 6){
            return res.status(200).json({
                message: "The password must be at least 6 characters"
            })
        }
        
        const user = await User.findOne({username})

        if (user) {
            return res.status(400).json({
                message: "The username is taken"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) 

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        if (!newUser){
            return res.status(400).json({
                message: "Invalid user data"
            })
        }
        else{
            // GENERATE JWT TOKENS 
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (error) {

        console.log(`Error in sign up controller ${error}`)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const signIn= async (req, res)=>{
    const {username, password} = req.body;
    try {

        const user = await User.findOne({username});

        
    } catch (error) {
        console.log(`Error while signing in ${error}`)
    }
}

export const signOut=(req, res)=>{
    res.send("Sign Out done");
}
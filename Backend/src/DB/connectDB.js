import { DB_NAME } from "../constants.js";
import mongoose from "mongoose"

const connectDB=async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        // console.log(connectionInstance)
        console.log(`The DB is connection with instance ${connectionInstance}`)
    }
    catch(error){
        console.log("There seems to be a problem in DB connection.")
    }
}

export default connectDB;
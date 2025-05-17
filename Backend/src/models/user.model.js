import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        default: "Guest"
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    avatar:{
        type: String,
        default: ""
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

export const User=mongoose.model("User", userSchema);
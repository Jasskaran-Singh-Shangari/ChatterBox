import connectDB from "./DB/connectDB.js";
import app from "./app.js";
import {server} from "./utils/socket.js" 

connectDB()
.then(()=>{
    app.on("error", ()=>{
        console.log("There seems to be a problem in the app.")
    })
    server.listen(process.env.PORT, ()=>{
        console.log(`The app is listening on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("There seems to be a problm with the app.")
})
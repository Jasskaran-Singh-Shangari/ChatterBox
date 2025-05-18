import express from "express";
import cors from "cors" 
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import cookieParser from "cookie-parser"

const app = express();

// USING MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(cookieParser());




// INITIALIZING ROUTES

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)


export default app;


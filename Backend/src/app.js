import express from "express";
import cors from "cors" 
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import cookieParser from "cookie-parser"

import {app} from "./utils/socket.js"

// USING MIDDLEWARES

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());


// INITIALIZING ROUTES

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)


export default app;


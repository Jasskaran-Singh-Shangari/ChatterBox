import express from "express";
import cors from "cors" 
import authRouter from "./routes/auth.route.js"

const app = express();

// USING MIDDLEWARES

app.use(express.json());
app.use(cors());




// INITIALIZING ROUTES

app.use("/api/auth", authRouter)



export default app;


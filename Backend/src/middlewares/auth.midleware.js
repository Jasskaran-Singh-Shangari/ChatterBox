import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
  console.log("Reached the protected route");

  try {
    const token = req.cookies.token; // ✅ match cookie name
    if (!token)
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // ✅ same secret
    if (!decodedToken)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = await User.findById(decodedToken._id).select("-password"); // ✅ match payload
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    console.log("User verified:", user.username);

    next();
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

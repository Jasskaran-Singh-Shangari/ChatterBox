import { Router } from "express";
import { protectRoute } from "../middlewares/auth.midleware.js";
import { getMessages, getUsersforSidebar, sendMessage } from "../controllers/message.controller.js";

const router =Router();

router.route("/users").get(protectRoute, getUsersforSidebar)
router.route("/:id").get(protectRoute, getMessages)

router.route("/send/:id").post(protectRoute, sendMessage)

export default router;
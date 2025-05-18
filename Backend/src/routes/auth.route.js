import Router from "express"
import { checkAuth, signIn, signOut, signUp, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.midleware.js"

const router = Router()

router.route("/signIn").post(signIn)
router.route("/signOut").post(signOut)
router.route("/signUp").post(signUp)

// PROTECTED ROUTE

router.put("/update-profile", protectRoute, updateProfile)
router.route("/check").get(protectRoute, checkAuth)

export default router;
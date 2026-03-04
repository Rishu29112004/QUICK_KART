import express from "express"
import authenticateUser from "../middleware/authMiddleWare.js"
import { multerMiddleware } from "../config/cloudinary.js"
import { getMyProfile, updateProfile } from "../controller/userProfileController.js"


const profileRouter = express.Router()

profileRouter.put("/profileUpdate/:id", authenticateUser, multerMiddleware.single("imageUrl"), updateProfile);

profileRouter.get("/getProfile/:id", authenticateUser, getMyProfile);

export default profileRouter
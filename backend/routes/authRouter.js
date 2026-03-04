import express from "express"
import authenticateUser from "../middleware/authMiddleWare.js"

import { login, register, refreshToken, logout, checkAuth} from "../controller/authController.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/refresh-token", authenticateUser, refreshToken)
router.post("/logout", authenticateUser, logout)
router.get("/me", authenticateUser, checkAuth)

export default router
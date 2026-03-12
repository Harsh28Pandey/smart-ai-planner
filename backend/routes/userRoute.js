import express from "express"
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, verification, verifyOTP } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { userSchema, validateUser } from "../validators/userValidate.js"
import upload from "../middlewares/uploadMiddleware.js"

const router = express.Router()

/**
 * - POST /user/register
 * - Register a new user
*/
router.post("/register", validateUser(userSchema), registerUser)

/**
 * - POST /user/verify
 * - after register go to the verification email to verify your account
*/
router.post("/verify", verification)

/**
 * - POST /user/login
 * - login a user with email and password
*/
router.post("/login", loginUser)

/**
 * - POST /user/logout
 * - logout a user
*/
router.post("/logout", isAuthenticated, logoutUser)

/**
 * - POST /user/forgot-password
 * - user should forgot your password entering the email 
*/
router.post("/forgot-password", forgotPassword)

/**
 * - POST /user/verify-otp/:email
 * - verify otp through email
*/
router.post("/verify-otp/:email", verifyOTP)

/**
 * - POST /user/change-password/:email
 * - change password through a email after verifing your otp
*/
router.post("/change-password/:email", changePassword)

/**
 * - POST /user/upload-image
 * - upload a image
*/
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No File Uploaded"
        })
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl })
})

export default router
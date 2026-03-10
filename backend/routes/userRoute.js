import express from "express"
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, verification, verifyOTP } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { userSchema, validateUser } from "../validators/userValidate.js"

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

export default router
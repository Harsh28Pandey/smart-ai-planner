import express from "express"
import "dotenv/config"
import connectDB from "./configs/db.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"

const app = express()

// middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// routes
app.use("/user", userRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running on PORT: ${PORT}`)
})
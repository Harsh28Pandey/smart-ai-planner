import express from "express"
import "dotenv/config"
import connectDB from "./configs/db.js"
import notesRoute from "./routes/noteRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import path from "path"

const app = express()

//* middlewares
app.use(express.json())
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173"
app.use(cors({
    origin: corsOrigin,
    credentials: true
}))

//* routes
app.use("/user", userRoute)
app.use("/api/notes", notesRoute);

app.use("/uploads", express.static("uploads"))
// Serve uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

const PORT = process.env.PORT || 8000

//* server starting
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Running on PORT: ${PORT}`)
})
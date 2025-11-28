import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./libs/db.js"
import { protectedRoute } from "./middlewares/authMiddleware.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json())
app.use(cookieParser())

//public route
app.use("/api/auth", authRoute)

//private route
app.use(protectedRoute)
app.use("/api/users", userRoute)

//connect to db
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

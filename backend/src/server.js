import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./libs/db.js"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

//middlewares
app.use(express.json())
app.use(cookieParser())

//public route
app.use("/api/auth", authRoute)

//private route

//connect to db
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

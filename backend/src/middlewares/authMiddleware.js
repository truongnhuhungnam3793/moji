import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectedRoute = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Token not found" })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token or expired token" })
      }

      const user = await User.findById(decoded.userId).select("-hashedPassword")

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      req.user = user
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

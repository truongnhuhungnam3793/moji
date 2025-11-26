import bcrypt from "bcrypt"
import User from "../models/User.js"

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body

    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const duplicate = await User.findOne({ username })

    if (duplicate) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      username,
      email,
      hashedPassword,
      displayName: `${firstName} ${lastName}`,
    })

    return res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

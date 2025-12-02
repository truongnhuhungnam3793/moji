import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import Session from "../models/Session.js"
import User from "../models/User.js"

const token_ttl = "30m"
const refresh_token_ttl = 14 * 24 * 60 * 60 * 1000

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

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      // @ts-ignore
      process.env.JWT_SECRET,
      { expiresIn: token_ttl }
    )

    const refreshToken = crypto.randomBytes(64).toString("hex")

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + refresh_token_ttl),
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: refresh_token_ttl,
    })

    return res.status(200).json({
      message: `User ${user.displayName} signed in successfully`,
      accessToken,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const signOut = async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const session = await Session.findOne({ refreshToken: token })

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    await session.deleteOne()

    res.clearCookie("refreshToken")

    return res.status(200).json({ message: "User signed out successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const session = await Session.findOne({ refreshToken: token })

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (session.expiresAt < Date.now()) {
      return res.status(403).json({ message: "Expired token" })
    }

    const accessToken = jwt.sign(
      { userId: session.userId },
      // @ts-ignore
      process.env.JWT_SECRET,
      { expiresIn: token_ttl }
    )

    return res.status(200).json({
      message: "User signed in successfully",
      accessToken,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

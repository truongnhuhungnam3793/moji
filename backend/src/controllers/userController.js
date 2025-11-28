export const authMe = async (req, res) => {
  try {
    const user = req.user
    return res
      .status(200)
      .json({ message: "User authenticated successfully", user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

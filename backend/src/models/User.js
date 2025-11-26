import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: { type: String, required: true },
    displayName: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    avatarId: { type: String },
    bio: { type: String, maxLength: 500 },
    phone: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)

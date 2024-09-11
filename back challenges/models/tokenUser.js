const mongoose = require("mongoose");

const tokenUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken: {
    type: String,
    required: [true, "Please provide refresh token "],
  },
  ip: {
    type: String,
    required: [true, "Please provide ip "],
  },
  userAgent: {
    type: String,
    required: [true, "Please provide user agent "],
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("TokenUser", tokenUserSchema);

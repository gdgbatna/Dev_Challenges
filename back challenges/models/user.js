const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name "],
    trim: true,
    minlength: 3,
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, "Enter email"],
    validate: {
      validator: isEmail,
      message: "please provide  valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
    minlength: 7,
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  passwordToken: { type: String },
  passwordTokenExpirationDate: { type: Date },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

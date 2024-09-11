const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/user");
const TokenUser = require("../models/tokenUser");

const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  hashString,
} = require("../utils");

const crypto = require("crypto");

const origin = "http://localhost:5173";

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  // if email already exists
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // create a verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");

  // create a user
  const user = await User.create({
    email,
    password,
    name,
    verificationToken,
  });

  // send verification email
  await sendVerificationEmail({ name, email, verificationToken, origin });
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please Check Your Email To Verify Account",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  // if email are not exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  if (user?.verificationToken != verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }
  user.isVerifiedEmail = true;
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "email Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  // if user  does not exist
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // if user  exist
  if (user) {
    // check if password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    // check if email is verified
    if (!user.isVerifiedEmail) {
      throw new CustomError.UnauthenticatedError("Please Verify your email");
    }
    // create payload
    const token = createTokenUser(user);
    // create refresh token
    let refreshToken = "";
    // check for existing token
    const existingToken = await TokenUser.findOne({ userId: user._id });
    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: token, refreshToken });
      res.status(StatusCodes.OK).json({ user: token });
      return;
    }
    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = {
      refreshToken,
      ip,
      userAgent,
      userId: user._id,
    };
    await TokenUser.create(userToken);
    attachCookiesToResponse({ res, user: token, refreshToken });
    res.status(StatusCodes.OK).json({ user: token });
    return;
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }
  // if user  exists
  const user = await User.findOne({ email });
  // if user  does not exist
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const passwordToken = crypto.randomBytes(70).toString("hex");
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;
  if (user) {
    // send email
    await sendResetPasswordEmail({
      name: user.name,
      email,
      token: passwordToken,
      origin,
    });
    user.passwordToken = hashString(passwordToken);
    user.passwordTokenExpirationDate = new Date(Date.now() + oneHour);
    await user.save();
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for rest password" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const currentDate = new Date();
  if (user) {
    if (
      user.passwordToken === hashString(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    } else {
      throw new CustomError.BadRequestError("Invalid Token");
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Password reset successful" });
};

const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};


module.exports = {
  login,
  registerUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
};

const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const TokenUser = require("../models/tokenUser");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("name email ");
  res.status(StatusCodes.OK).json({
    count: users.length,
    users,
  });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("name email");
  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
};

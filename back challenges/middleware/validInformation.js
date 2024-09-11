const {
  BadRequestError,
} = require("../errors");
const validEmail = (userEmail) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(userEmail);
};
const ValidInformationRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return new BadRequestError("Please provide all values");
  }
  if (password.length < 6) {
    return new BadRequestError("Password must be at least 6 characters");
  }
  // email with js regex

  if (!validEmail(email)) {
    return new BadRequestError("Please provide a valid email");
  }
  next();
};
const ValidInformationLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new BadRequestError("Please provide email and password");
  }
  if (password.length < 6) {
    return new BadRequestError("Please provide email and password");
  }
  if (!validEmail(email)) {
    return new BadRequestError("Please provide a valid email");
  }
  next();
}

module.exports = { ValidInformationRegister, ValidInformationLogin };
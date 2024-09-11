const { createJWT, isTokenValid ,attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser")
const sendVerificationEmail = require("./sendVerificationEmail")
const sendResetPasswordEmail = require("./sendResetPasswordEmail")
const hashString = require("./createHash")
module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  attachCookiesToResponse,
  sendResetPasswordEmail,
  sendVerificationEmail,
  hashString
};

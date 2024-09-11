const CustomError = require("../errors");
const { attachCookiesToResponse, isTokenValid } = require("../utils");
const TokenUser = require("../models/tokenUser");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    // if access token exists
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    // if refresh token exists
    const payload = isTokenValid(refreshToken);
    let existingToken;
    existingToken = await TokenUser.findOne({
      userId: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    console.log("PAYLOAD", payload);
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    req.user = payload.user;
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
};

module.exports = { authenticateUser };

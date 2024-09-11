const jwt = require("jsonwebtoken");
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneHour = 60 * 60 * 1000; // in milliseconds  
  const oneDay = 24 * oneHour ; // in milliseconds
  const month = oneDay * 30; // in milliseconds

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneHour),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + month),
  });
};

// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({payload:user});
//   const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure:process.env.NODE_ENV === 'production',
//     signed:true,
//   });
// };
module.exports = {
  attachCookiesToResponse,
  createJWT,
  isTokenValid,
};

const sendEmail = require("./sendEmail");
const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirme your email by clicking on the following link:<a href="${verifyEmail}">Verify Email</a></p>`;
  return sendEmail({
    to: email,
    subject: "Email verification",
    html: `<h3>Hello ${name}</h3> ${message}`,
  });
};
module.exports = sendVerificationEmail;
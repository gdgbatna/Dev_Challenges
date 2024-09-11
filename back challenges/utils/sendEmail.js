const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sendEmail = async ({ to, subject, html }) => {
  // create reusable transporter object using the default SMTP
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);
  
  return transporter.sendMail({
    from: `"Achraf Nessighaoui"<kadin.kutch@ethereal.email>`, // sender address
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;

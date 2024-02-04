const sendEmail = require("../../config/mailer/sendMail");
const Token = require("../../models/signUpToken");
const crypto = require("crypto");

const sendVerificationMail = async function (userId, email, link, subject) {
  try {
    await Token.findOneAndDelete({ userId: userId });
    let token = await Token.create({
      userId: userId,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const message = `${link}?id=${userId}&token=${token.token}`;
    sendEmail(email, subject, message);
  } catch (err) {
    throw err;
  }
};

module.exports = sendVerificationMail;

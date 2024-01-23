const Token = require("../../models/signUpToken");
const User = require("../../models/users");
const generateAccessToken = require("../../utils/genToken");
const sendVerificationMail = require("./sendVerificationMail");
const bcrypt = require("bcrypt");

const resetPassRequest = async function (req, res) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email" });
    }
    if (user && !user.verified) {
      return res.status(404).json({ message: "Email is not verified" });
    }

    const link = `${process.env.BASE_URL}/api/auth/resetPass-verify`;
    sendVerificationMail(user._id, user.email, link, "Password reset link");
    return res.status(200).json({ message: "Reset Link are sent to email" });
  } catch (err) {
    return res.status(404).json({ message: "Reset Request Failed" });
  }
};

const resetPassTokenVerification = async function (req, res) {
  try {
    const userId = req.query.id;
    const token = req.query.token;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Invalid Id or Token" });
    }

    if (user && !user.verified) {
      return res.status(404).json({ message: "Verify user first" });
    }

    const tokenVal = await Token.findOne({ userId: userId });
    if (!tokenVal) {
      return res.status(404).json({ message: "Not Verified" });
    }

    if (tokenVal.token != token) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const jwtToken = generateAccessToken({ id: user._id });

    res.cookie("access_token", jwtToken, {
      httpOnly: true,
      maxAge: 3600000,
    });
    // console.log(token + "090");
    res.redirect(`${process.env.CLIENT}/reset-password`);
  } catch (err) {
    return res.status(404).json({ message: "token verification Error" });
  }
};

const resetPassword = async function (req, res) {
  try {
    const userId = req.user.id;
    console.log(process.env.SALT_ROUND);
    const tokenVal = await Token.findOne({ userId: userId });
    if (!tokenVal) {
      return res.status(404).json({ message: "Not Verified" });
    }
    await Token.findByIdAndDelete(tokenVal._id);
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashPass = await bcrypt.hash(req.body.password, salt);
    console.log(hashPass);
    await User.findByIdAndUpdate(userId, { password: hashPass });

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    return res.status(404).json({ message: "token verification Error" });
  }
};
module.exports = {
  resetPassRequest,
  resetPassTokenVerification,
  resetPassword,
};

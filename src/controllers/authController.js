const inputValidation = require("../utils/validation");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/genToken");
const sendEmail = require("../config/mailer/sendMail");
const Token = require("../models/signUpToken");
const sendVerificationMail = require("./auth/sendVerificationMail");

module.exports.signUp = async function (req, res) {
  try {
    inputValidation.signUpInputValidation.parse(req.body);
    const users = await User.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(process.env.SALT_ROUND);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    let user;
    if (users) {
      if (users.verified) {
        return res
          .status(403)
          .json({ message: "Invalid email or username, already exist!" });
      }

      user = await User.findOneAndUpdate(
        { email: req.body.email },
        {
          username: req.body.username,
          password: hashPass,
          name: req.body.username,
        }
      );
    } else {
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
        name: req.body.username,
      });
    }
    const link = `${process.env.BASE_URL}/api/auth/verify`;
    sendVerificationMail(
      user._id,
      user.email,
      link,
      "User Sign up verification"
    );
    user.password = undefined;

    res
      .status(200)
      .json({ message: "Verification Link is sent to email", user });
  } catch (error) {
    res.end();
  }
};

module.exports.signIn = async function (req, res) {
  try {
    inputValidation.signInInputValidation.parse(req.body);
    const user = await User.findOne({
      $or: [{ username: req.body.userId }, { email: req.body.userId }],
    });
    if (user && !user.verified) {
      const link = `${process.env.BASE_URL}/api/auth/verify`;
      sendVerificationMail(
        user._id,
        user.email,
        link,
        "User Sign up verification"
      );
      res
        .status(403)
        .json({ message: "user Not verified, mail is sent please verify!" });
    }
    if (!user) {
      res.status(403).json({ message: "Invalid credentials!" });
    }

    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken({ id: user._id });

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "none",
      secure: true,
    });
    user.password = undefined;
    res.status(200).json({
      username: user.username,
      email: user.email,
      name: user.name,
      profile_pic: user.profile_pic,
      cat: user.category,
    });
  } catch (error) {}
};

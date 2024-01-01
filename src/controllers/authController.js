const inputValidation = require("../utils/validation");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/genToken");
const saltRound = 10;

module.exports.signUp = async function (req, res) {
  try {
    inputValidation.signUpInputValidation.parse(req.body);
    const users = await User.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (users.length > 0) {
      res
        .status(403)
        .json({ message: "Invalid email or username, already exist!" });
    }

    const salt = await bcrypt.genSalt(saltRound);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    console.log(hashPass);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
      name: req.body.username,
    });

    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.end();
  }
};

module.exports.signIn = async function (req, res) {
  try {
    inputValidation.signInInputValidation.parse(req.body);
    const user = await User.findOne({
      $or: [{ username: req.body.userId }, { email: req.body.userId }],
    });
    console.log(user);
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
    });
    console.log(token + "090");
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const User = require("../../models/users");
const bcrypt = require("bcrypt");

async function changePassword(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const pass = await bcrypt.compare(req.body.oldPass, user.password);
    if (!pass) {
      return res.status(403).json({ message: "Invalid Old Password" });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashPass = await bcrypt.hash(req.body.pass, salt);

    await User.findByIdAndUpdate(user._id, { password: hashPass });

    res.status(200).json("Password canged successfully");
  } catch (error) {
    res.json("Error occured");
  }
}

module.exports = changePassword;

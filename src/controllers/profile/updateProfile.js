const User = require("../../models/users");

const updateProfile = async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: "Error in profile updation." });
  }
};

const changePass = async function (req, res) {
  try {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;

    const user = await User.findById(req.user.id);
    const pass = await bcrypt.compare(oldPass, user.password);
    if (!pass) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const salt = await bcrypt.genSalt(process.env.SALT_ROUND);
    const hashPass = await bcrypt.hash(newPass, salt);

    user.password = hashPass;
    await user.save();

    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: "error in change Pass" });
  }
};

module.exports = { updateProfile, changePass };

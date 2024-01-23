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

module.exports = updateProfile;

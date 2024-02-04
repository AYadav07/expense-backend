const User = require("../../models/users");

const updateProfile = async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    user.password = undefined;
    res.status(200).json({
      username: user.username,
      email: user.email,
      name: user.name,
      profile_pic: user.profile_pic,
      cat: user.category,
    });
  } catch (err) {
    return res.status(404).json({ message: "Error in profile updation." });
  }
};

module.exports = updateProfile;

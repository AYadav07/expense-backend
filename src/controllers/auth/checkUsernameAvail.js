const User = require("../../models/users");

const usernameAvail = async function (req, res) {
  try {
    const username = req.query.username;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(200).json({ avail: false });
    }
    return res.status(200).json({ avail: true });
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = usernameAvail;

const User = require("../../models/users");

const usernameAvail = async function (req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.send(false);
    }
    return res.send(true);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = usernameAvail;

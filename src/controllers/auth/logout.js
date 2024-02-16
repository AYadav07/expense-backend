const logout = async function (req, res) {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Logout successfull");
  } catch (error) {}
};

module.exports = logout;

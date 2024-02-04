const logout = async function (req, res) {
  try {
    res.cookie("access_token", undefined, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json("Logout successfull");
  } catch (error) {}
};

module.exports = logout;

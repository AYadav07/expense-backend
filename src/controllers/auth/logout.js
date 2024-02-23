const logout = async function (req, res) {
  try {
    res.clearCookie("access_token", {
      domain: "expense-ui-six.vercel.app",
      httpOnly: true,
      maxAge: 36,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json("Logout successfull");
  } catch (error) {}
};

module.exports = logout;

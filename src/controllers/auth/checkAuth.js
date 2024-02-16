const isLogged = async (req, res) => {
  try {
    return res.status(200).json({ message: "Authenticated" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

module.exports = isLogged;

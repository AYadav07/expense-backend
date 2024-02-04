const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "You are not authenticated with token" });
      }

      req.user = data;
    });

    next();
  } catch (err) {}
};

module.exports = verifyToken;

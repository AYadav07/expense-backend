const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: "You are not authenticated" });
  }

  jwt.verify(token, process.env.access_token, (err, data) => {
    if (err) {
      res.status(401).json({ message: "You are not authenticated with token" });
    }

    req.user = data;
  });

  next();
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

function verifyHeaderToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

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
  } catch (err) {
    return res.status(500).json({ message: "Error in token verification" });
  }
}

module.exports = verifyHeaderToken;

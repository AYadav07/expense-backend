const Token = require("../../models/signUpToken");
const User = require("../../models/users");

const verifyEmailToken = async (req, res) => {
  try {
    const user = req.query.id;
    const token = req.query.token;

    const tokenVal = await Token.findOne({ userId: user });
    if (!tokenVal) {
      return res.status(404).json({ message: "Not Verified" });
    }
    console.log(tokenVal);
    console.log(tokenVal.token);
    console.log(token);
    console.log(tokenVal.token != token);

    if (tokenVal.token != token) {
      return res.status(404).json({ message: "Invalid token" });
    }

    await User.findByIdAndUpdate(user, { verified: true });
    await Token.findByIdAndDelete(tokenVal._id);

    let data = `
      <div>
        <h1>Email Verified Successfully.</h1>
        <br />
        <br />
        Click the below link for login
        <a href="http://localhost:5000/sign-in">Sign In</a>
      </div>
    `;
    res.header("Content-Type", "text/html");
    res.send(data);
    res.end();
  } catch (err) {
    res.status(404).json({ message: "Error occured" });
  }
};

module.exports = verifyEmailToken;

const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");

const isloggedin = async function (req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).send("Unauthorized Access");
  }

  try {
    const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
      next();
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

module.exports = isloggedin;
const verifyUser = require("../utils/VerifyUser");
const crypto = require("crypto");

module.exports.ResendMail = async (req, res) => {
  const { MentorEmail, data } = req.body;
  try {
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationUrl = `http://localhost:8000/verify-email/${verificationToken}`;

    await verifyUser(
      MentorEmail,
      "Please Verify Your Email",
      data,
      verificationUrl
    );
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal server error");
  }
};

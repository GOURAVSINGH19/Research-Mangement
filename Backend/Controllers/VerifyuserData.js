const Usersinfomodels = require("../Models/Usersinfomodels");

module.exports.verifyUser = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send("Token is required");
  }

  try {
    const user = await Usersinfomodels.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    user.verified = true;
    if (user.verified == true) {
      user.Notifications = "Your work is Uploaded ";
    } else {
      user.Notifications = "Your work is not Uploaded ";
    }
    user.verificationToken = null;
    await user.save();

    res.send("Your email has been verified successfully!");
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.MarkedNotificaion = async (req, res) => {
  try {
    const user = await Usersinfomodels.findByIdAndUpdate(req.params.id, {
      Notifications: "",
    });
    await user.save();
    res.json("Notifications marked successfully");
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).send("Internal server error");
  }
};

const UserInfoModel = require("../Models/Usersinfomodels");
const sendEmail = require("../utils/VerifyUser");
const crypto = require("crypto");

module.exports.Uploaduserinfo = async (req, res) => {
  const {
    username,
    email,
    phone,
    enrollmentno,
    college,
    department,
    batchStart,
    batchEnd,
    github,
    linkedin,
    facultyname,
    projectStart,
    projectEnd,
    projectUrl,
    researchtitle,
    researchdescription,
    ongoingproject,
    MentorEmail,
  } = req.body;

  try {
    if (!email) {
      return res.status(400).send("Please provide an email");
    }

    const existingUser = await UserInfoModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationUrl = verificationToken;

    // Create new user with the verification token
    const newUser = new UserInfoModel({
      username,
      email,
      phone,
      enrollmentno,
      college,
      department,
      batchStart,
      batchEnd,
      github,
      linkedin,
      facultyname,
      projectStart,
      projectEnd,
      projectUrl,
      researchtitle,
      researchdescription,
      ongoingproject,
      MentorEmail,
      verificationToken,
    });

    // Save the user
    await newUser.save();

    // Send the verification email
    await sendEmail(
      MentorEmail,
      "Please Verify Your Email",
      req.body,
      verificationUrl
    );

    // Respond with the new user data
    res.json(newUser);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserInfoModel.find({ verified: true });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.Getalluser = async (req, res) => {
  try {
    const users = await UserInfoModel.find({});
    if (!users) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).json({ msg: "Error while getting all users" });
  }
};

module.exports.GetUserByID = async (req, res) => {
  try {
    const user = await UserInfoModel.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.DeleteById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  try {
    const user = await UserInfoModel.findByIdAndUpdate(id);
    if (!user) {
      return res.status(404).json({ msg: "UI element not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user info:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

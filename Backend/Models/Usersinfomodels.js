const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const UserinfoModel = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    enrollmentno: { type: Number, required: true, unique: true, sparse: true },
    college: { type: String },
    department: { type: String },
    batchStart: { type: Date },
    batchend: { type: Date },
    github: { type: String },
    linkedin: { type: String },
    facultyname: { type: String },
    projectStart: { type: Date },
    projectEnd: { type: Date },
    projectUrl: { type: String },
    researchtitle: { type: String },
    researchdescription: { type: String },
    ongoingproject: { type: Boolean },
    MentorEmail: { type: String },
    verificationToken: String,
    verified: { type: Boolean, default: false },
    Notifications: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Userinfo", UserinfoModel);

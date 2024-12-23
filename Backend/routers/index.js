const express = require("express");
const router = express.Router();
const isloggedin = require("../Middlewares/isloggedin");
router.get("/", function (req, res) {
  let error = req.flash("error");
  res.send(error.message);
});

router.get("/logout", isloggedin, function (req, res) {
  req.logout();
  req.flash("success", "Logged out successfully!");
});



module.exports = router;

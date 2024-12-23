const nodemailer = require("nodemailer");

const PASSWORD_RESET_REQUEST_TEMPLATE = require("../multitrap/EmailTemplate");

const sendMail = async (email, text, OTP) => {
  const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    html: PASSWORD_RESET_REQUEST_TEMPLATE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const mailoptions = {
    from: {
      name: "Sprint",
      address: process.env.EMAIL,
    },
    to: email,
    html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
  </div>
</div>`,
    subject: text,
    text: text,
  };

  transpoter.sendMail(mailoptions, (err) => {
    if (err) console.log(err);
    else console.log("Email sent successfully");
  });
};

module.exports = sendMail;

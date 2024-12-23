const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const VerifyUser = async (email, subject, data, token) => {
  const id = `http://localhost:8000/info/verify/${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "BPIT-COLLEGE",
      address: process.env.EMAIL,
    },
    to: email,
    subject: subject,
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f0f0f0;">
        <div style="max-width: 600px; width: 100%; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); background-color: #fff;">
          <h1 style="text-align: center; font-size: 24px; font-weight: bold;">Verify User</h1>
          <p style="text-align: center; color: #666;">Enter your details to verify User.</p>
            <div style="margin: 20px 0;">
              <span>
                <strong>Username:</strong> ${data.username}
              </span>
              <span>
                <strong>Project URL:</strong> ${data.projectUrl}
              </span>
              <span>
                <strong>Project Title:</strong> ${data.researchtitle}
              </span>
              <span>
                <strong>Faculty Name:</strong> ${data.facultyname}
              </span>
              <span>
                <strong>Department:</strong> ${data.department}
              </span>
              <span>
                <strong>Phone Number:</strong> ${data.phone}
              </span>
            </div>
           <div>
      <h1>Verify Your Identity</h1>
      <a href="${id}" style="text-decoration: none;">
        <button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">Verify</button>
      </a>
      <a href="http://localhost:8000/info/verify/" style="text-decoration: none;">
        <button style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px;">Cancel</button>
      </a>
    </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions, (err) => {
    if (err) console.log(err);
    else console.log("Email sent successfully");
  });
};

module.exports = VerifyUser;

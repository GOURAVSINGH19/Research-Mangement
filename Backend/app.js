const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");

const index = require("./routers/index");
const usersrouter = require("./routers/Userroute");
const connectDB = require("./config/mongoose-connection");

const dotenv = require('dotenv');

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// By using flash, you can easily display temporary messages to users and provide a better user experience.
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/info", usersrouter);

// Connect to MongoDB database
connectDB();
app.listen(process.env.PORT || 5000, () => console.log(`listening on port ${process.env.PORT}`));

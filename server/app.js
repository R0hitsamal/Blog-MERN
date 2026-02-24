const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const postsRouter = require("./routes/postsRoute");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
require('dotenv').config();
const User = require("./model/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

const sessionOption = {
  name: "blog.sid",
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log("DB Connected Succesfully"))
  .catch(() => console.log("DB Connection ERROR"));

app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to GITAVERS");
});

app.listen(5000, () => {
  console.log("App is listining to port no. 5000");
});

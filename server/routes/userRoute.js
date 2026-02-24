const express = require("express");
const {Register, Login, logout, EditUser, DeleteUser} = require("../controller/user");
const router = express.Router();
const passport = require("passport")
const localStrategy = require("passport-local")
const { isAuthor, isLoggedin } = require("../middleware/Auth");


router.post("/register", Register);
router.post(
  "/login",
  passport.authenticate("local"),
  Login
);

router.get("/logout",logout);

router.get("/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    return res.json({ isAuthenticated: false });
  }
});
router.get("/isAuthorised/:id", isAuthor, (req, res) => {
  res.json({ isAuthor: true });
});

router.patch("/edituser/:id",isLoggedin,EditUser)
router.delete("/deleteuser/:id",isLoggedin,DeleteUser)

module.exports = router;
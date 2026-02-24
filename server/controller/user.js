const express = require("express");
const User = require("../model/user");
const Posts = require("../model/posts");
const {sendMailResister} = require("../utils/nodemail");

const Register = async (req, res) => {
  try {
    const {username, email, password, cpassword} = req.body;
    console.log(req.body);
    if (!username || !email || !password || !cpassword) {
      return res.json({message: "Please fillup all the details "});
    }
    const userExist = await User.findOne({username: username});
    if (userExist) {
      return res.json({message: "User already exists "});
    }
    const emailExist = await User.findOne({email : email});
    if (emailExist) {
      return res.json({message: "User exist from this mail id. Give another mail id"});
    }
    if (password.length < 8) {
      return res.json({message: "Password must be 8 digit"});
    }
    if (password !== cpassword) {
      return res.json({message: "Password must be same"});
    }
    let newUser = new User({email, username});
    let regUser = await User.register(newUser, password);
    req.login(regUser, (err) => {
      if (err) {
        res
          .status(500)
          .json({message: "Internal server error", error: err.message});
      }
    });
    await sendMailResister(email, username);
    res.status(201).json({message: "User created succesfully", user: req.user});
  } catch (error) {
    console.log("Resistration error", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
};
const Login = async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.json({message: "Please fillup all the details "});
  }
  res.status(200).json({message: "Welcome Back", user: req.user});
};

const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      res
        .status(500)
        .json({message: "Internal server error", error: err.message});
    }
    console.log(req.user);
    res.status(200).json({message: "Logged out successfully!", user: req.user});
  });
};

const EditUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {email, username} = req.body;

    if (!username || !email) {
      return res.status(400).json({message: "Please fill up all the details"});
    }

    const userExist = await User.findOne({username});

    if (userExist && userExist._id.toString() !== id) {
      return res.status(409).json({message: "Username already exists"});
    }

    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({message: "User not found"});
    }
    const oldUsername = oldUser.username;
    const updatedData = await User.findByIdAndUpdate(
      id,
      {email, username},
      {new: true}
    );
    await Posts.updateMany(
      {username: oldUsername},
      {$set: {username: username}}
    );
    req.login(updatedData, (err) => {
      if (err) {
        return res.status(500).json({message: "Session refresh failed"});
      }

      res.status(200).json({
        message: "User updated successfully",
        updatedData: updatedData,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error in updating"});
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const deleted = await User.findById(id);
    const username = deleted.username;
    console.log(username);
    if (!deleted) return res.status(404).json({message: "User not found"});

    const dPosts = await Posts.deleteMany({username: username});
    const dUser = await User.findByIdAndDelete(id);
    res.status(200).json({message: "User deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error in delete"});
  }
};

module.exports = {Register, Login, logout, EditUser, DeleteUser};

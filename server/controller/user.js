const express = require("express");
const User = require("../model/user");

const Register = async (req, res) => {
  try {
    const {username, email, password, cpassword} = req.body;
    if (!username || !email || !password || !cpassword) {
      return res.json({message: "Please fillup all the details "});
    }
    const userExist = await User.findOne({email: req.body.email});
    if (userExist) {
      return res.json({message: "User already exists "});
    }
    if (password.length < 8) {
      return res.json({message: "Password must be 8 digit"});
    }
    if (password !== cpassword) {
      return res.json({message: "Password must be same"});
    }
    const user = await User.create(req.body);
    res.status(201).json({message: "User created succesfully", user});
  } catch (error) {
    console.log("Resistration error", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
};

module.exports = Register;

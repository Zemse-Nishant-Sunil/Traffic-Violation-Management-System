const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });
  }
});

// POST - Register a new user
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      mobile,
      dob,
      gender,
      license,
      vehicleNumber,
      vehicleType,
      address,
      rating,
      status
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: role || "user",
      mobile,
      dob,
      gender,
      license,
      vehicleNumber,
      vehicleType,
      address,
      rating: rating || 0,
      status: status || "active"
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

module.exports = router;
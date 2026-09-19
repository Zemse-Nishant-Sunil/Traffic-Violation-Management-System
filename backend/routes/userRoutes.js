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

// POST - Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required"
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      role: role
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email, password or role"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email, password or role"
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked by the Admin"
      });
    }

    if (user.role === "officer" && user.status === "pending") {
      return res.status(403).json({
        message: "Your Officer account is waiting for Admin approval"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

// GET - Get all pending officers
router.get("/pending-officers", async (req, res) => {
  try {
    const officers = await User.find({
      role: "officer",
      status: "pending"
    }).select("-password");

    res.json(officers);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending officers",
      error: error.message
    });
  }
});


// PUT - Approve or reject an officer
router.put("/officer/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        message: "Invalid officer status"
      });
    }

    const officer = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "officer"
      },
      {
        status: status
      },
      {
        new: true
      }
    ).select("-password");

    if (!officer) {
      return res.status(404).json({
        message: "Officer not found"
      });
    }

    res.json({
      message:
        status === "active"
          ? "Officer approved successfully"
          : "Officer rejected/blocked successfully",
      officer
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating officer status",
      error: error.message
    });
  }
});

module.exports = router;
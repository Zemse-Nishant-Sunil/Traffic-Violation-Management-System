const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "officer", "admin"],
      default: "user"
    },

    mobile: {
      type: String,
      required: true
    },

    dob: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

   license: {
  type: String,
  unique: true,
  sparse: true,
  required: function () {
    return this.role === "user";
  }
},

vehicleNumber: {
  type: String,
  required: function () {
    return this.role === "user";
  }
},

vehicleType: {
  type: String,
  required: function () {
    return this.role === "user";
  }
},

    address: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["active", "pending", "blocked"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
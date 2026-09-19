import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    role: "user",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    license: "",
    vehicleNumber: "",
    vehicleType: "",
    address: "",
    password: "",
    confirmPassword: "",
    rating: ""
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }

    setSuccess("");
  };

  // Experiment 2 - Password Strength
  const calculatePasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    setPasswordStrength(score);
  };

  // Experiment 2 - Star Rating
  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating
    }));

    $(".rating-star").each(function () {
      const starRating = Number($(this).data("rating"));

      if (starRating <= rating) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });
  };

  const validate = () => {
    const newErrors = {};

    // Common fields
    if (!formData.role) {
      newErrors.role = "Please select an account type.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name =
        "Name should contain only letters and spaces.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Mobile Number must contain exactly 10 digits.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender.";
    }

    // Vehicle information is required ONLY for normal users
    if (formData.role === "user") {
      if (!formData.license.trim()) {
        newErrors.license =
          "Driving License Number is required.";
      }

      if (!formData.vehicleNumber.trim()) {
        newErrors.vehicleNumber =
          "Vehicle Registration Number is required.";
      }

      if (!formData.vehicleType) {
        newErrors.vehicleType =
          "Please select vehicle type.";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register User / Officer
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=================================");
    console.log("REGISTER BUTTON CLICKED");
    console.log("FORM DATA:", formData);
    console.log("=================================");

    setSuccess("");
    setErrors({});

    // Validate form
    const isValid = validate();

    console.log("VALIDATION RESULT:", isValid);

    if (!isValid) {
      console.log(
        "❌ REGISTRATION STOPPED: Validation failed"
      );
      return;
    }

    // Admin cannot register publicly
    if (formData.role === "admin") {
      console.log(
        "❌ REGISTRATION STOPPED: Admin registration"
      );

      setErrors({
        role:
          "Admin accounts can only be created by an existing administrator."
      });

      return;
    }

    // Officer requires Admin approval
    const userStatus =
      formData.role === "officer"
        ? "pending"
        : "active";

    // Common registration data
    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
      mobile: formData.mobile.trim(),
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address.trim(),
      status: userStatus
    };

    // User-only information
    if (formData.role === "user") {
      registrationData.license =
        formData.license.trim();

      registrationData.vehicleNumber =
        formData.vehicleNumber.trim();

      registrationData.vehicleType =
        formData.vehicleType;

      registrationData.rating =
        Number(formData.rating) || 0;
    }

    console.log("=================================");
    console.log("🚀 ABOUT TO SEND AXIOS REQUEST");
    console.log("DATA BEING SENT:", registrationData);
    console.log("=================================");

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        registrationData
      );

      console.log("=================================");
      console.log("✅ AXIOS REQUEST SUCCESSFUL");
      console.log("SERVER RESPONSE:", response.data);
      console.log("=================================");

      // Keep localStorage for Experiment 4 compatibility
      const users =
        JSON.parse(
          localStorage.getItem("tvmsUsers")
        ) || [];

      const newUser = {
        ...registrationData,
        rating: formData.rating
      };

      users.push(newUser);

      localStorage.setItem(
        "tvmsUsers",
        JSON.stringify(users)
      );

      console.log("✅ LOCALSTORAGE UPDATED");

      // Success message
      if (formData.role === "officer") {
        setSuccess(
          "Officer registration request submitted successfully. Please wait for Admin approval."
        );
      } else {
        setSuccess(
          "User registration successful! You can now login."
        );
      }

      // Reset form
      setFormData({
        role: "user",
        name: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        license: "",
        vehicleNumber: "",
        vehicleType: "",
        address: "",
        password: "",
        confirmPassword: "",
        rating: ""
      });

      setPasswordStrength(0);

      $(".rating-star").removeClass("selected");

    } catch (error) {
      console.error("=================================");
      console.error(
        "❌ AXIOS REQUEST FAILED"
      );
      console.error("ERROR:", error);
      console.error("=================================");

      if (error.response) {
        console.error(
          "SERVER STATUS:",
          error.response.status
        );

        console.error(
          "SERVER DATA:",
          error.response.data
        );

        setErrors({
          email:
            error.response.data.message ||
            "Registration failed."
        });

      } else if (error.request) {
        setErrors({
          email:
            "No response received from the TVMS backend. Make sure the backend server is running on port 5000."
        });

      } else {
        setErrors({
          email:
            "Unable to send registration request."
        });
      }

    } finally {
      setLoading(false);
    }
  };

  const strengthText = () => {
    if (passwordStrength === 0) {
      return "No password";
    }

    if (passwordStrength === 1) {
      return "Weak";
    }

    if (passwordStrength === 2) {
      return "Medium";
    }

    return "Strong";
  };

  const resetForm = () => {
    setFormData({
      role: "user",
      name: "",
      email: "",
      mobile: "",
      dob: "",
      gender: "",
      license: "",
      vehicleNumber: "",
      vehicleType: "",
      address: "",
      password: "",
      confirmPassword: "",
      rating: ""
    });

    setErrors({});
    setPasswordStrength(0);
    setSuccess("");

    $(".rating-star").removeClass("selected");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-header">

          <div className="register-logo">
            🚦
          </div>

          <h1>
            TRAFFIC VIOLATION MANAGEMENT SYSTEM
          </h1>

          <p>
            User Registration Form
          </p>

        </div>

        <div className="register-card">

          <h2>
            Create Account
          </h2>

          <p className="register-subtitle">
            Register for Traffic Violation Management Services
          </p>

          {success && (
            <div className="success-message">
              {success}

              <br />

              <Link to="/login">
                Click here to Login
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* ROLE */}

            <div className="form-group">

              <label>
                Account Type *
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option value="user">
                  👤 User
                </option>

                <option value="officer">
                  👮 Officer
                </option>

              </select>

              <p className="role-info">

                {formData.role === "user" &&
                  "Users can register directly and access traffic services."}

                {formData.role === "officer" &&
                  "Officer registration requires approval from an Admin."}

              </p>

              {errors.role && (
                <span className="error-text">
                  {errors.role}
                </span>
              )}

            </div>


            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className="error-text">
                  {errors.name}
                </span>
              )}

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address *
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}

            </div>


            {/* MOBILE */}

            <div className="form-group">

              <label>
                Mobile Number *
              </label>

              <input
                type="text"
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
              />

              {errors.mobile && (
                <span className="error-text">
                  {errors.mobile}
                </span>
              )}

            </div>


            {/* DOB */}

            <div className="form-group">

              <label>
                Date of Birth *
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              {errors.dob && (
                <span className="error-text">
                  {errors.dob}
                </span>
              )}

            </div>


            {/* GENDER */}

            <div className="form-group">

              <label>
                Gender *
              </label>

              <div className="radio-group">

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={
                      formData.gender === "Male"
                    }
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={
                      formData.gender === "Female"
                    }
                    onChange={handleChange}
                  />
                  Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={
                      formData.gender === "Other"
                    }
                    onChange={handleChange}
                  />
                  Other
                </label>

              </div>

              {errors.gender && (
                <span className="error-text">
                  {errors.gender}
                </span>
              )}

            </div>


            {/* LICENSE - USER ONLY */}

            {formData.role === "user" && (

              <div className="form-group">

                <label>
                  Driving License Number *
                </label>

                <input
                  type="text"
                  name="license"
                  placeholder="Enter driving license number"
                  value={formData.license}
                  onChange={handleChange}
                />

                {errors.license && (
                  <span className="error-text">
                    {errors.license}
                  </span>
                )}

              </div>

            )}


            {/* VEHICLE NUMBER - USER ONLY */}

            {formData.role === "user" && (

              <div className="form-group">

                <label>
                  Vehicle Registration Number *
                </label>

                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Example: MH01AB1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                />

                {errors.vehicleNumber && (
                  <span className="error-text">
                    {errors.vehicleNumber}
                  </span>
                )}

              </div>

            )}


            {/* VEHICLE TYPE - USER ONLY */}

            {formData.role === "user" && (

              <div className="form-group">

                <label>
                  Vehicle Type *
                </label>

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Vehicle Type
                  </option>

                  <option value="Bike">
                    Bike
                  </option>

                  <option value="Car">
                    Car
                  </option>

                  <option value="Truck">
                    Truck
                  </option>

                  <option value="Bus">
                    Bus
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

                {errors.vehicleType && (
                  <span className="error-text">
                    {errors.vehicleType}
                  </span>
                )}

              </div>

            )}


            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address *
              </label>

              <textarea
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
              />

              {errors.address && (
                <span className="error-text">
                  {errors.address}
                </span>
              )}

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Create Password *
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

              <div className="strength-container">

                <div className="strength-bar">

                  <div
                    className={`strength-fill strength-${passwordStrength}`}
                    style={{
                      width: `${(passwordStrength / 3) * 100}%`
                    }}
                  ></div>

                </div>

                <span className="strength-text">
                  {strengthText()}
                </span>

              </div>

              {errors.password && (
                <span className="error-text">
                  {errors.password}
                </span>
              )}

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>
                Confirm Password *
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <span className="error-text">
                  {errors.confirmPassword}
                </span>
              )}

            </div>


            {/* STAR RATING - USER ONLY */}

            {formData.role === "user" && (

              <div className="form-group rating-group">

                <label>
                  Rate This Form
                </label>

                <div className="stars">

                  {[1, 2, 3, 4, 5].map((rating) => (

                    <span
                      key={rating}
                      className="rating-star"
                      data-rating={rating}
                      onClick={() =>
                        handleRating(rating)
                      }
                    >
                      ★
                    </span>

                  ))}

                </div>

                <p className="rating-value">

                  {formData.rating
                    ? `You selected ${formData.rating}/5`
                    : "Select your rating"}

                </p>

              </div>

            )}


            {/* BUTTONS */}

            <div className="button-group">

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading
                  ? "Registering..."
                  : "Register"}
              </button>

              <button
                type="reset"
                className="reset-button"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </button>

            </div>

          </form>


          <div className="register-footer">

            <p>
              Already have an account?
            </p>

            <Link to="/login">
              Login
            </Link>

          </div>


          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;
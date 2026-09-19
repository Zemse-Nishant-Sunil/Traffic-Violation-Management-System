import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoginError("");
    setLoading(true);

    try {
      console.log("LOGIN DATA:", data);

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: data.email.trim().toLowerCase(),
          password: data.password,
          role: data.role
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      const account = response.data.user;

      // Store logged-in user for dashboard use
      localStorage.setItem(
        "tvmsLoggedInUser",
        JSON.stringify(account)
      );

      // Role-based dashboard navigation
      if (account.role === "user") {
        navigate("/user-dashboard");
      }

      if (account.role === "officer") {
        navigate("/officer-dashboard");
      }

      if (account.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        setLoginError(
          error.response.data.message || "Login failed."
        );
      } else if (error.request) {
        setLoginError(
          "Unable to connect to the TVMS backend. Make sure the backend server is running on port 5000."
        );
      } else {
        setLoginError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">

          <div className="login-logo">
            🚦
          </div>

          <h1>TVMS</h1>

          <p>
            Traffic Violation Management System
          </p>

        </div>

        <div className="login-card">

          <h2>Login</h2>

          <p className="login-subtitle">
            Login to access your dashboard
          </p>

          {loginError && (
            <div className="login-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required"
                })}
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email.message}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required"
                })}
              />

              {errors.password && (
                <span className="error-text">
                  {errors.password.message}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>Select Role</label>

              <select
                {...register("role", {
                  required: "Please select a role"
                })}
              >

                <option value="">
                  Select Role
                </option>

                <option value="user">
                  User
                </option>

                <option value="officer">
                  Officer
                </option>

                <option value="admin">
                  Admin
                </option>

              </select>

              {errors.role && (
                <span className="error-text">
                  {errors.role.message}
                </span>
              )}

            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="login-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create Account
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

export default LoginPage;
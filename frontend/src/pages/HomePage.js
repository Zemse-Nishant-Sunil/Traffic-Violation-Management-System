import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">

      <nav className="navbar">
        <div className="logo">
          🚦 TVMS
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            SMART TRAFFIC MANAGEMENT
          </span>

          <h1>
            Traffic Violation
            <br />
            Management System
          </h1>

          <p>
            A centralized digital platform for managing traffic
            violations, fines, vehicles and citizen services.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Login
            </Link>

            <Link to="/register" className="secondary-btn">
              Register
            </Link>
          </div>

        </div>

        <div className="hero-card">

          <div className="traffic-light">
            <div className="light red"></div>
            <div className="light yellow"></div>
            <div className="light green"></div>
          </div>

          <h2>Traffic Safety</h2>

          <p>
            Report, manage and track traffic violations
            through one secure platform.
          </p>

        </div>

      </section>

      <section className="features-section">

        <h2>System Features</h2>

        <div className="features">

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Users</h3>
            <p>
              Register vehicles, view violations,
              fines and payment history.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👮</div>
            <h3>Officers</h3>
            <p>
              Record violations, issue fines and
              manage traffic cases.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Admin</h3>
            <p>
              Manage users, officers, violations
              and system records.
            </p>
          </div>

        </div>

      </section>

      <footer>
        <p>
          © 2026 Traffic Violation Management System
        </p>
      </footer>

    </div>
  );
}

export default HomePage;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout({
  user,
  role,
  icon,
  title,
  children
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("tvmsLoggedInUser");
    navigate("/login");
  };

  const roleName =
    role === "admin"
      ? "Administrator"
      : role === "officer"
      ? "Traffic Officer"
      : "Citizen";

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <header className="dashboard-header">

        <div className="dashboard-brand">
          <span className="dashboard-brand-icon">🚦</span>

          <div>
            <h1>TVMS</h1>
            <p>Traffic Violation Management System</p>
          </div>
        </div>

        <div className="dashboard-user-area">

          <div className="dashboard-user-info">
            <strong>
              {user?.name || roleName}
            </strong>

            <span>
              {roleName}
            </span>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}
      <main className="dashboard-container">

        {/* WELCOME */}
        <section className="dashboard-welcome">

          <div className="welcome-icon">
            {icon}
          </div>

          <div>
            <h2>
              Welcome, {user?.name || roleName}
            </h2>

            <p>
              {title}
            </p>
          </div>

        </section>


        {/* PAGE CONTENT */}
        <section className="dashboard-content">
          {children}
        </section>

      </main>


      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p>
          © 2026 Traffic Violation Management System
        </p>
      </footer>

    </div>
  );
}

export default DashboardLayout;
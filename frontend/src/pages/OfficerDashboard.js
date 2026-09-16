import React from "react";
import { useNavigate } from "react-router-dom";

function OfficerDashboard() {

  const navigate = useNavigate();

  const officer =
    JSON.parse(
      localStorage.getItem("tvmsLoggedInUser")
    );

  const logout = () => {

    localStorage.removeItem(
      "tvmsLoggedInUser"
    );

    navigate("/login");
  };

  return (

    <div style={{
      padding: "40px"
    }}>

      <h1>👮 Officer Dashboard</h1>

      <h2>
        Welcome, {officer?.name || "Officer"}
      </h2>

      <p>
        Role: Officer
      </p>

      <hr />

      <h3>Officer Services</h3>

      <ul>
        <li>Search Vehicle</li>
        <li>Search User</li>
        <li>Record Traffic Violation</li>
        <li>Upload Violation Evidence</li>
        <li>Issue Fine</li>
        <li>Update Violation Status</li>
        <li>View Assigned Cases</li>
        <li>View Payments</li>
        <li>Handle Complaints</li>
      </ul>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default OfficerDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  const user =
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

      <h1>👤 User Dashboard</h1>

      <h2>
        Welcome, {user?.name || "User"}
      </h2>

      <p>
        Role: User
      </p>

      <hr />

      <h3>Traffic Services</h3>

      <ul>
        <li>View My Vehicles</li>
        <li>View Traffic Violations</li>
        <li>View Fine Details</li>
        <li>Pay Traffic Fine</li>
        <li>Payment History</li>
        <li>Raise Complaint</li>
        <li>Give Feedback</li>
      </ul>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default UserDashboard;
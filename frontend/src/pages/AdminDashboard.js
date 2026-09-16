import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const admin =
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

      <h1>⚙️ Admin Dashboard</h1>

      <h2>
        Welcome, {admin?.name || "Administrator"}
      </h2>

      <p>
        Role: Admin
      </p>

      <hr />

      <h3>Administration</h3>

      <ul>
        <li>Manage Users</li>
        <li>Manage Officers</li>
        <li>Manage Vehicles</li>
        <li>Manage Traffic Violations</li>
        <li>Manage Fines</li>
        <li>View Payments</li>
        <li>Assign Officers</li>
        <li>View Complaints</li>
        <li>View Reports</li>
      </ul>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;
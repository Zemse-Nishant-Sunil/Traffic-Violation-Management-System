import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("tvmsLoggedInUser")
  );

  const [pendingOfficers, setPendingOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("tvmsLoggedInUser");
    navigate("/login");
  };

  // Fetch pending officers
  const fetchPendingOfficers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/users/pending-officers"
      );

      setPendingOfficers(response.data);
    } catch (error) {
      console.error("Error fetching officers:", error);

      setError(
        "Unable to load pending officers. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOfficers();
  }, []);

  // Approve officer
  const approveOfficer = async (id) => {
    try {
      setMessage("");
      setError("");

      const response = await axios.put(
        `http://localhost:5000/api/users/officer/${id}/status`,
        {
          status: "active"
        }
      );

      setMessage(
        response.data.message
      );

      fetchPendingOfficers();

    } catch (error) {
      console.error("Approval error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to approve officer."
      );
    }
  };

  // Reject / block officer
  const rejectOfficer = async (id) => {
    try {
      setMessage("");
      setError("");

      const response = await axios.put(
        `http://localhost:5000/api/users/officer/${id}/status`,
        {
          status: "blocked"
        }
      );

      setMessage(
        response.data.message
      );

      fetchPendingOfficers();

    } catch (error) {
      console.error("Rejection error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to reject officer."
      );
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif"
      }}
    >

      <h1>⚙️ Admin Dashboard</h1>

      <h2>
        Welcome, {admin?.name || "Administrator"}
      </h2>

      <p>
        Role: Admin
      </p>

      <hr />

      {/* Messages */}

      {message && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px"
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px"
          }}
        >
          {error}
        </div>
      )}

      {/* Officer Approval */}

      <h2>👮 Pending Officer Approvals</h2>

      {loading ? (
        <p>Loading pending officers...</p>
      ) : pendingOfficers.length === 0 ? (
        <p>
          No pending officer registration requests.
        </p>
      ) : (
        <div>

          {pendingOfficers.map((officer) => (
            <div
              key={officer._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                maxWidth: "700px",
                background: "#f9f9f9"
              }}
            >

              <h3>
                {officer.name}
              </h3>

              <p>
                <strong>Email:</strong>{" "}
                {officer.email}
              </p>

              <p>
                <strong>Mobile:</strong>{" "}
                {officer.mobile}
              </p>

              <p>
                <strong>Date of Birth:</strong>{" "}
                {officer.dob}
              </p>

              <p>
                <strong>Gender:</strong>{" "}
                {officer.gender}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {officer.address}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {officer.status}
              </p>

              <button
                onClick={() =>
                  approveOfficer(officer._id)
                }
                style={{
                  marginRight: "10px",
                  padding: "10px 18px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                ✅ Approve
              </button>

              <button
                onClick={() =>
                  rejectOfficer(officer._id)
                }
                style={{
                  padding: "10px 18px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                ❌ Reject
              </button>

            </div>
          ))}

        </div>
      )}

      <hr />

      {/* Other Admin Functions */}

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

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;
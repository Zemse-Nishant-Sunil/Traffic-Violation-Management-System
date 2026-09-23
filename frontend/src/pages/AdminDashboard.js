import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

function AdminDashboard() {

  const admin = JSON.parse(
    localStorage.getItem("tvmsLoggedInUser")
  );

  const [pendingOfficers, setPendingOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPendingOfficers = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/users/pending-officers"
      );

      setPendingOfficers(response.data);

    } catch (error) {

      console.error(
        "Error fetching officers:",
        error
      );

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

      setMessage(response.data.message);

      fetchPendingOfficers();

    } catch (error) {

      console.error(
        "Approval error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to approve officer."
      );

    }
  };


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

      setMessage(response.data.message);

      fetchPendingOfficers();

    } catch (error) {

      console.error(
        "Rejection error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to reject officer."
      );

    }
  };


  const services = [
    {
      icon: "👥",
      title: "Manage Users",
      description: "Manage registered citizens."
    },
    {
      icon: "👮",
      title: "Manage Officers",
      description: "Manage traffic officer accounts."
    },
    {
      icon: "🚗",
      title: "Manage Vehicles",
      description: "Manage registered vehicles."
    },
    {
      icon: "🚨",
      title: "Manage Violations",
      description: "Manage traffic violation records."
    },
    {
      icon: "💰",
      title: "Manage Fines",
      description: "Manage traffic fines."
    },
    {
      icon: "💳",
      title: "View Payments",
      description: "View payment information."
    },
    {
      icon: "📋",
      title: "Assign Officers",
      description: "Assign officers to cases."
    },
    {
      icon: "📢",
      title: "View Complaints",
      description: "Review citizen complaints."
    },
    {
      icon: "📊",
      title: "View Reports",
      description: "View system reports."
    }
  ];


  return (

    <DashboardLayout
      user={admin}
      role="admin"
      icon="⚙️"
      title="Manage users, officers and traffic system operations."
    >

      {/* MESSAGES */}

      {message && (
        <div className="dashboard-success">
          {message}
        </div>
      )}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      {/* OFFICER APPROVAL */}

      <section className="dashboard-section">

        <h3 className="dashboard-section-title">
          👮 Pending Officer Approvals
        </h3>


        {loading ? (

          <div className="dashboard-card">
            <p>
              Loading pending officers...
            </p>
          </div>

        ) : pendingOfficers.length === 0 ? (

          <div className="dashboard-card">
            <p>
              No pending officer registration requests.
            </p>
          </div>

        ) : (

          pendingOfficers.map((officer) => (

            <div
              className="dashboard-card"
              key={officer._id}
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
                className="dashboard-action-button dashboard-approve"
                onClick={() =>
                  approveOfficer(officer._id)
                }
              >
                ✅ Approve
              </button>


              <button
                className="dashboard-action-button dashboard-reject"
                onClick={() =>
                  rejectOfficer(officer._id)
                }
              >
                ❌ Reject
              </button>

            </div>

          ))

        )}

      </section>


      {/* ADMIN SERVICES */}

      <section className="dashboard-section">

        <h3 className="dashboard-section-title">
          ⚙️ Administration
        </h3>

        <div className="dashboard-service-grid">

          {services.map((service, index) => (

            <div
              className="dashboard-service-card"
              key={index}
            >

              <div className="service-icon">
                {service.icon}
              </div>

              <div className="service-title">
                {service.title}
              </div>

              <div className="service-description">
                {service.description}
              </div>

            </div>

          ))}

        </div>

      </section>

    </DashboardLayout>
  );
}

export default AdminDashboard;
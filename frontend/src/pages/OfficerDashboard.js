import React from "react";
import DashboardLayout from "../components/DashboardLayout";

function OfficerDashboard() {

  const officer = JSON.parse(
    localStorage.getItem("tvmsLoggedInUser")
  );

  const services = [
    {
      icon: "🔎",
      title: "Search Vehicle",
      description: "Search registered vehicle information."
    },
    {
      icon: "👤",
      title: "Search User",
      description: "Search citizen account information."
    },
    {
      icon: "🚨",
      title: "Record Traffic Violation",
      description: "Record a new traffic violation."
    },
    {
      icon: "📷",
      title: "Upload Violation Evidence",
      description: "Upload evidence related to a violation."
    },
    {
      icon: "💰",
      title: "Issue Fine",
      description: "Issue a fine for a recorded violation."
    },
    {
      icon: "🔄",
      title: "Update Violation Status",
      description: "Update the status of violation cases."
    },
    {
      icon: "📋",
      title: "View Assigned Cases",
      description: "View cases assigned to you."
    },
    {
      icon: "💳",
      title: "View Payments",
      description: "View traffic fine payment information."
    },
    {
      icon: "📢",
      title: "Handle Complaints",
      description: "Review and handle citizen complaints."
    }
  ];

  return (
    <DashboardLayout
      user={officer}
      role="officer"
      icon="👮"
      title="Manage traffic violations and officer services."
    >

      <section className="dashboard-section">

        <h3 className="dashboard-section-title">
          Officer Services
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

export default OfficerDashboard;
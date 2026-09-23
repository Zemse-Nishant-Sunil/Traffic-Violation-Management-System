import React from "react";
import DashboardLayout from "../components/DashboardLayout";

function UserDashboard() {

  const user = JSON.parse(
    localStorage.getItem("tvmsLoggedInUser")
  );

  const services = [
    {
      icon: "🚗",
      title: "View My Vehicles",
      description: "View your registered vehicles."
    },
    {
      icon: "🚨",
      title: "Traffic Violations",
      description: "View your traffic violation records."
    },
    {
      icon: "💰",
      title: "Fine Details",
      description: "Check your pending and previous fines."
    },
    {
      icon: "💳",
      title: "Pay Traffic Fine",
      description: "Pay your traffic violation fine."
    },
    {
      icon: "🧾",
      title: "Payment History",
      description: "View your previous payments."
    },
    {
      icon: "📢",
      title: "Raise Complaint",
      description: "Submit a complaint regarding traffic services."
    },
    {
      icon: "⭐",
      title: "Give Feedback",
      description: "Share your experience with the system."
    }
  ];

  return (
    <DashboardLayout
      user={user}
      role="user"
      icon="👤"
      title="Access your traffic services and account information."
    >

      <section className="dashboard-section">

        <h3 className="dashboard-section-title">
          Traffic Services
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

export default UserDashboard;
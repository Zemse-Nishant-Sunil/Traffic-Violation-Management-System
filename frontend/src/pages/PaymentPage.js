import React, { useState } from "react";
import axios from "axios";

function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session"
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to start payment.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Traffic Violation Fine Payment</h1>

      <p>TVMS Demo Payment</p>

      <h2>$10.00</h2>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Redirecting..." : "Pay Fine"}
      </button>
    </div>
  );
}

export default PaymentPage;
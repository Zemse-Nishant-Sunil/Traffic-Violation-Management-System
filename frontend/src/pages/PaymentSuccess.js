import React from "react";

function PaymentSuccess() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Payment Successful</h1>

      <p>Your traffic violation fine payment was completed successfully.</p>

      <p>Thank you for using the Traffic Violation Management System.</p>

      <a href="/">
        <button>Go to Home</button>
      </a>
    </div>
  );
}

export default PaymentSuccess;
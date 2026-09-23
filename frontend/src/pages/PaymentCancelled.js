import React from "react";

function PaymentCancelled() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Payment Cancelled</h1>

      <p>Your payment was cancelled.</p>

      <a href="/payment">
        <button>Try Again</button>
      </a>
    </div>
  );
}

export default PaymentCancelled;
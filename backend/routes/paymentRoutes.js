const express = require("express");
const Stripe = require("stripe");

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Traffic Violation Fine",
              description: "TVMS Demo Payment"
            },
            unit_amount: 1000
          },
          quantity: 1
        }
      ],

      mode: "payment",

      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancelled"
    });

    res.json({
      url: session.url
    });
  } catch (error) {
    console.error("Stripe payment error:", error.message);

    res.status(500).json({
      message: "Unable to create payment session"
    });
  }
});

module.exports = router;
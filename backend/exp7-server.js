const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Allow JSON data
app.use(bodyParser.json());

// Home page with TVMS form
app.get("/", (req, res) => {

  res.send(`
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <title>TVMS - Express.js</title>

      <style>

        body {
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          margin: 0;
          padding: 40px 20px;
        }

        .container {
          max-width: 500px;
          margin: auto;
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .logo {
          font-size: 50px;
        }

        h1 {
          color: #0b1f3a;
          font-size: 25px;
        }

        .header p {
          color: #667085;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 18px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 7px;
          color: #333;
        }

        input,
        select {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          border: 1px solid #ccd3dc;
          border-radius: 7px;
          font-size: 15px;
        }

        button {
          width: 100%;
          padding: 13px;
          background: #1683ff;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #0869d1;
        }

        .back {
          display: block;
          text-align: center;
          margin-top: 20px;
          color: #1683ff;
          text-decoration: none;
        }

      </style>

    </head>

    <body>

      <div class="container">

        <div class="header">

          <div class="logo">🚦</div>

          <h1>
            TRAFFIC VIOLATION MANAGEMENT SYSTEM
          </h1>

          <p>
            Experiment 7 - Express.js Form
          </p>

        </div>

        <div class="card">

          <h2>Traffic Violation Report</h2>

          <form
            action="/submit"
            method="POST"
          >

            <div class="form-group">

              <label for="name">
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              >

            </div>

            <div class="form-group">

              <label for="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              >

            </div>

            <div class="form-group">

              <label for="vehicleNumber">
                Vehicle Registration Number
              </label>

              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="Example: MH01AB1234"
                required
              >

            </div>

            <div class="form-group">

              <label for="violation">
                Traffic Violation
              </label>

              <select
                id="violation"
                name="violation"
                required
              >

                <option value="">
                  Select Violation
                </option>

                <option value="Overspeeding">
                  Overspeeding
                </option>

                <option value="Signal Jumping">
                  Signal Jumping
                </option>

                <option value="No Helmet">
                  No Helmet
                </option>

                <option value="No Seat Belt">
                  No Seat Belt
                </option>

                <option value="Wrong Parking">
                  Wrong Parking
                </option>

              </select>

            </div>

            <button type="submit">
              Submit Violation
            </button>

          </form>

          <a
            href="http://localhost:3000"
            class="back"
          >
            ← Back to React TVMS
          </a>

        </div>

      </div>

    </body>

    </html>
  `);
});

// Handle POST form submission
app.post("/submit", (req, res) => {

  const {
    name,
    email,
    vehicleNumber,
    violation
  } = req.body;

  res.send(`
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <title>TVMS - Submission</title>

      <style>

        body {
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          padding: 40px 20px;
        }

        .result {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 35px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #187a3d;
        }

        .data {
          background: #f4f7fb;
          padding: 20px;
          border-radius: 8px;
          line-height: 2;
        }

        a {
          display: inline-block;
          margin-top: 20px;
          color: #1683ff;
          text-decoration: none;
          font-weight: bold;
        }

      </style>

    </head>

    <body>

      <div class="result">

        <h1>
          ✓ Form Submitted Successfully
        </h1>

        <div class="data">

          <strong>Name:</strong>
          ${name}

          <br>

          <strong>Email:</strong>
          ${email}

          <br>

          <strong>Vehicle Number:</strong>
          ${vehicleNumber}

          <br>

          <strong>Violation:</strong>
          ${violation}

        </div>

        <a href="/">
          ← Submit Another Report
        </a>

      </div>

    </body>

    </html>
  `);

});

// Start Express server
const PORT = 5001;

app.listen(PORT, () => {

  console.log(
    `TVMS Express.js server running at http://localhost:${PORT}`
  );

});
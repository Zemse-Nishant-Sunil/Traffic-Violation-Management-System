const http = require("http");

const server = http.createServer((req, res) => {

  res.statusCode = 200;

  res.setHeader("Content-Type", "text/html");

  const homePage = `
  <!DOCTYPE html>

  <html lang="en">

  <head>

    <meta charset="UTF-8">

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >

    <title>TVMS - Node.js Server</title>

    <style>

      body {
        font-family: Arial, sans-serif;
        background-color: #f4f7fb;
        margin: 0;
        padding: 0;
        text-align: center;
      }

      header {
        background: #0b1f3a;
        color: white;
        padding: 25px 0;
      }

      header h1 {
        margin: 0;
      }

      main {
        padding: 50px 20px;
      }

      .card {
        background: white;
        max-width: 600px;
        margin: auto;
        padding: 35px;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .traffic-light {
        font-size: 60px;
        margin-bottom: 20px;
      }

      h2 {
        color: #172033;
      }

      p {
        color: #667085;
        font-size: 17px;
        line-height: 1.6;
      }

      footer {
        background: #0b1f3a;
        color: white;
        padding: 15px;
        margin-top: 50px;
      }

    </style>

  </head>

  <body>

    <header>

      <h1>
        TRAFFIC VIOLATION MANAGEMENT SYSTEM
      </h1>

    </header>

    <main>

      <div class="card">

        <div class="traffic-light">
          🚦
        </div>

        <h2>
          Node.js Web Server
        </h2>

        <p>
          Welcome to the Traffic Violation
          Management System.
        </p>

        <p>
          This webpage is being served directly
          using the Node.js HTTP module.
        </p>

        <p>
          Experiment No. 6
        </p>

      </div>

    </main>

    <footer>

      <p>
        TVMS &copy; 2026
      </p>

    </footer>

  </body>

  </html>
  `;

  res.end(homePage);

});

const PORT = 5000;

server.listen(PORT, () => {

  console.log(
    `TVMS Node.js server running at http://localhost:${PORT}`
  );

});
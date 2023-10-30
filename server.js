require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:3000";
const allowedOrigins = ALLOWED_ORIGINS.split(",");

var corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www.form-urlenconded
app.use(express.urlencoded({ extended: true }));

// health route
app.get("/health", (req, res) => {
  res.json({ message: "Calculator API is Up!" });
});

// routes
app.use(
  "/api/v1",
  require("./routes/auth.routes").router,
  require("./routes/operation.routes").router,
  require("./routes/record.routes").router
);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Unless using the --runInBand flag, jest tests run in parallel. If the app is
// listening on a netwrok port we will get "EADDRINUSE - port already in use"
// errors while running tests. Luckily, we don't need to be listening on a port
// at all for supertest to work.
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(
      `Backend connected to database and listening on port ${PORT} 😋`
    )
  );
}

module.exports = {
  app,
};

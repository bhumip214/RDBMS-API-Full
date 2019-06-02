const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cohortsRoute = require("./routes/cohortsRoute");
const studentsRoute = require("./routes/studentsRoute");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use("/api/cohorts", cohortsRoute);
server.use("/api/students", studentsRoute);

server.get("/", async (req, res, next) => {
  res.send(`<h2>Lambda Cohorts API</h2>`);
});

module.exports = server;

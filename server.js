const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // needed for sqlite
};

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/", async (req, res, next) => {
  res.send(`<h2>Lambda Cohorts API</h2>`);
});

module.exports = server;

const express = require("express");

const router = express.Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // needed for sqlite
};

const db = knex(knexConfig);

router.use(express.json());

//Get all cohorts from the database
router.get("/", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The cohorts information could not be retrieved." });
  }
});

//Get cohort by id request
router.get("/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The cohort information could not be retrieved." });
  }
});

// Create cohorts request
router.post("/", async (req, res) => {
  try {
    if (req.body.name) {
      const [id] = await db("cohorts").insert(req.body);

      const cohort = await db("cohorts")
        .where({ id })
        .first();
      res.status(201).json(cohort);
    } else {
      res.status(400).json({
        errorMessage: "Please provide the name for the cohort."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while saving the cohort to the database"
    });
  }
});

// // Update cohort request
router.put("/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } else {
      res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The cohort information could not be modified." });
  }
});

//delete cohorts request
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The cohort with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The cohort could not be deleted" });
  }
});

module.exports = router;

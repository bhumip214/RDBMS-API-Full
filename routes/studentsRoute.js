const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

router.use(express.json());

//Get all students from the database
router.get("/", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The students information could not be retrieved." });
  }
});

//Get student by id request
router.get("/:id", async (req, res) => {
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .first();
    if (student) {
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The student information could not be retrieved." });
  }
});

// Create students request
router.post("/", async (req, res) => {
  try {
    if (req.body.name && req.body.cohort_id) {
      const [id] = await db("students").insert(req.body);

      const student = await db("students")
        .where({ id })
        .first();
      res.status(201).json(student);
    } else {
      res.status(400).json({
        errorMessage: "Please provide the name and cohort id for the student."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error while saving the student to the database"
    });
  }
});

//Update student request
router.put("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The student information could not be modified." });
  }
});

//delete student request
router.delete("/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: "The student could not be deleted" });
  }
});
module.exports = router;

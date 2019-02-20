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

module.exports = router;

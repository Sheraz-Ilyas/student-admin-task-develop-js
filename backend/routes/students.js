const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentsController");

//get all students
router.get("/", getStudents);

//get a single student
router.get("/:id", getStudent);

//post a new student
router.post("/", createStudent);

//delete a student
router.delete("/:id", deleteStudent);

//update a student
router.patch("/:id", updateStudent);

module.exports = router;

const express = require("express");
const router = express.Router();

const Professor = require("../models/studentSchema");
const Student = require("../models/studentSchema");

router.get("/getAllStudent", async (req, res) => {
  try {
    const student = await Student.find();
    res.send(student);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const student = await Student.findOne({ teacherId: req.body.teacherId, universityId: req.body.universityId }).exec()

    console.log(student)

    if (student) {
      console.log(student)
      return res.json({ error: 1 });
    } else {
      const newStudent = new Student(req.body);
      await newStudent.save();
      return res.json({ error: 0, user: newStudent });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

module.exports = router;
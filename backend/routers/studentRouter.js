const express = require("express");
const router = express.Router();

const Student = require("../models/studentSchema");

router.get("/getstudentbyId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findOne({_id: id}).exec();
    res.send(student);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallstudents", async (req, res) => {
  try {
    const student = await Student.find();
    res.send(student);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const student = await Student.findOne({ collegeID: req.body.collegeID, universityId: req.body.universityId }).exec()

    if (student) {
      return res.json({ error: 1 });
    } else {
      const newStudent = new Student(req.body);
      await newStudent.save();
      return res.json({ error: 0 });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getstudent/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const student = await Student.findOne({ email: email });
    res.send(student);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallstudents/:universityId", async (req, res) => {
  const universityId = req.params.universityId;

  try {
    const students = await Student.find({universityId: universityId});
    res.send(students);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/edit", async (req, res) => {
  try {
    var student = await Student.findOne({ email: req.body.email }).exec();

    student.universityId = req.body.universityId;
    student.email = req.body.email;
    student.name = req.body.name;
    student.gender = req.body.gender;
    student.profilePhoto = req.body.profilePhoto;
    student.transcriptPhoto = req.body.transcriptPhoto;
    student.passingYear = req.body.passingYear;
    student.branch = req.body.branch;
    student.collegeID = req.body.collegeID;
    student.university = req.body.university;
    student.teachers = req.body.teachers;

    await student.save();

    res.send("Profile updated successfully");
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

module.exports = router;

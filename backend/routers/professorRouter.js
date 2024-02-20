const express = require("express");
const router = express.Router();

const Professor = require("../models/professorSchema");

router.get("/getallprofessors", async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallprofessors/:universityId", async (req, res) => {
  const universityId = req.params.universityId;

  try {
    const professors = await Professor.find({universityId: universityId}).exec();
    res.send(professors);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getprofessor/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const professor = await Professor.findOne({_id: id}).exec();
    res.send(professor);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const professor = await Professor.findOne({ teacherId: req.body.teacherId, universityId: req.body.universityId }).exec()

    console.log(professor)

    if (professor) {
      console.log(professor)
      return res.json({ error: 1 });
    } else {
      const newProfessor = new Professor(req.body);
      await newProfessor.save();
      return res.json({ error: 0, user: newProfessor });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Professor = require("../models/professorSchema");
const Student = require("../models/studentSchema");

router.post("/edit", async (req, res) => {
  try {
    var professor = await Professor.findOne({ email: req.body.email }).exec();

    professor.universityId = req.body.universityId;
    professor.email = req.body.email;
    professor.gender = req.body.gender;
    professor.teacherId= req.body.teacherId;
    professor.name = req.body.name;
    professor.signPhoto = req.body.signPhoto;
    professor.profilePhoto = req.body.profilePhoto;
    professor.qualification = req.body.qualification;
    professor.expertise = req.body.expertise;
    professor.experience = req.body.experience;
    professor.portfolioURL = req.body.portfolioURL;
    professor.university = req.body.university;
    professor.students = req.body.students;

    await professor.save();

    res.send("Profile updated successfully");
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

router.get("/getprofessors/:email", async (req, res) => {
  const email = req.params.email;
  //console.log(email);
  try {
    const professor = await Professor.findOne({ email: email }).exec();
    res.send(professor);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallprofessors", async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getStudentsByProfessor/:professorId/:lorstatus", async (req, res) => {
  const professorId = req.params.professorId;
  const lorstatus=req.params.lorstatus;
  console.log(lorstatus);
  try {
    const professor = await Professor.findById(professorId).exec();
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }

    const studentIds = professor.students
      .filter(student => student.lorStatus === lorstatus)
      .map(student => student.studentId);

    // Fetch students whose IDs are in the studentIds array and have the specified lorstatus
    const students = await Student.find({ _id: { $in: studentIds }}).exec();
    console.log(students);
    res.send(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/getStudentsByProfessor/:professorId", async (req, res) => {
//   const professorId = req.params.professorId;
//   try {
//     const professor = await Professor.findById(professorId).exec();
//     if (!professor) {
//       return res.status(404).json({ message: "Professor not found" });
//     }

//     const studentIds = professor.students.map(student => student.studentId);

//     const students = await Student.find({ _id: { $in: studentIds } }).exec();
//     res.send(students);
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

router.get('/getstudent/:id', async (req, res) => {
  const studentId = req.params.id;
  
  try {
    // Fetch student details from the database by ID
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Send student details as a response
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error' });
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

router.get("/getallprofessors", async (req, res) => {
  try {
    const professors = await Professor.find();
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

router.post("/studentrequest", async (req, res) => {
  
  try {
    console.log(req.body)

    const professor = await Professor.findOne({ _id: req.body.professorId }).exec()

    // console.log(professor)

    if (professor) {

      var student = {};
      student.studentId = req.body.studentId;

      delete req.body.studentId;
      delete req.body.professorId;

      professor.students.push({
        studentId: student["studentId"],
        lorStatus: "pending",
        studentData: req.body
      })

      // professor.save();

      res.send("Applied Successfully")
    } else {
      console.log(error)
      return res.status(400).json(error);
    }  
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
});

module.exports = router;

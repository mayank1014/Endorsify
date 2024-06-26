const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  universityId: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  teacherId: { type: String, required: true },
  name: { type: String, required: true },
  signPhoto: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  qualification: { type: String, required: true },
  expertise: [{ type: String, required: true }],
  experience: { type: String, required: true },
  portfolioURL: { type: String, required: true },
  university: {type: String, required: true},
  workingAs: {type: String, required: true},
  students: [
    {
      studentId: { type: String, required: true },
      lorStatus: { type: String, required: true },
      rejectReason:{ type: String, default:""},
      docx: {type: String},
      studentData: {},
    },
  ],
});

const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
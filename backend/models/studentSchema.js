const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  universityId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  gender: {type: String, required:true},
  profilePhoto: {type: String, required:true},
  transcriptPhoto: {type: String, required:true},
  passingYear: {type: Number, required:true},
  branch: {type: String, required:true},
  collegeID: {type: String, required:true},
  university: {type: String, required:true},
  teachers: [
    {
      professorId: { type: String, required: true },
      lorStatus: { type: String, required: true },
      rejectReason:{ type: String, default:""},
      docx: {type: String},
      professorData: {},
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

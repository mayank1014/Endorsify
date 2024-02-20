const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  universityId: { type: String, ref: 'User', required: true },
  email: { type: String, ref: 'User', required: true },
  name: { type: String, required: true },
  Gender: {type: String, required:true},
  profilePhoto: { type: String, required: true},
  transcriptPhoto: { type: String, required: true },
  passingYear: Number,
  branch: String,
  collegeID: String,
  university: String,
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

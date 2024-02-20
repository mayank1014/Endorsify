const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  universityId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
<<<<<<< HEAD
  Gender: {type: String, required:true},
  profilePhoto: { type: String, required: true},
  transcriptPhoto: { type: String, required: true },
  passingYear: Number,
  branch: String,
  collegeID: String,
  university: String,
=======
  gender: {type: String, required:true},
  profilePhoto: {type: String, required:true},
  transcriptPhoto: {type: String, required:true},
  passingYear: {type: Number, required:true},
  branch: {type: String, required:true},
  collegeID: {type: String, required:true},
  university: {type: String, required:true},
>>>>>>> 7ce6ab3ab953929b8f340affe7f84bfeedfff393
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  universityId: { type: String, ref: 'University', required: true },
  email: { type: String, ref: 'User', required: true },
  teacherId: { type: String, required: true, unique: true },
  university: String,
  name: { type: String, required: true },
  signPhoto: { data: Buffer, contentType: String },
  profilePhoto: { data: Buffer, contentType: String },
  qualification: String,
  expertise: String,
  experience: String,
  portfolioURL: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

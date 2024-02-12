const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  universityId: { type: String, ref: 'University', required: true },
  email: { type: String, ref: 'User', required: true },
  Gender: {type: String, required:true},
  teacherId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  signPhoto: { data: Buffer, contentType: String },
  profilePhoto: { data: Buffer, contentType: String },
  qualification: String,
  expertise: [String],
  experience: Number,
  portfolioURL: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
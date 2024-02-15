const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const universitySchema = new mongoose.Schema({
  uniId: { type: String, required: true },
  email: { type: String, required: true },
  // docxFile: { type: String, required: true }, 
  name: { type: String, required: true },
  location: { type: String, required: true },
  // logo: { type: String, required: true },
  websiteURL: { type: String, required: true },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;

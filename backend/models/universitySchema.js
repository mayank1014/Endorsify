const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  uniId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  location: {
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
  },
  websiteURL: { type: String, required: true },
  docxFile: { type: String, required: true },
  logo: { type: String, required: true },
  status: { type: String, required: true },
  payment: [{
    transactionId: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  }]
});

const University = mongoose.model('University', universitySchema);

module.exports = University;

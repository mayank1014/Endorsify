const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const universitySchema = new mongoose.Schema({
  uniId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  location: {
    city: { type: String},
    state: { type: String },
    postalCode: { type: String },
  },
  websiteURL: { type: String, required: true },
  docxFile: { type: String, required: true }, 
  logo: { type: String, required: true },
});


// universitySchema.virtual('docxTemplate').get(function () {
//   const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documents' });
//   return bucket.openDownloadStream(this._id);
// });

const University = mongoose.model('University', universitySchema);

module.exports = University;

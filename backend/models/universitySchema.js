const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const universitySchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  // docxFile: { type: String, required: true }, 
  name: { type: String, required: true },
  location: { type: String, required: true, unique: true },
  // logo: { type: String, required: true },
  websiteURL: { type: String, required: true, unique: true },
});

// universitySchema.virtual('docxTemplate').get(function () {
//   const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documents' });
//   return bucket.openDownloadStream(this._id);
// });

const University = mongoose.model('University', universitySchema);

module.exports = University;

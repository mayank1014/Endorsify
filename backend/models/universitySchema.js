const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const universitySchema = new mongoose.Schema({
  universityId: { type: String, required: true, unique: true },
  email: { type: String, ref: 'User', required: true },
  // docxFile: { data: Buffer, contentType: String }, 
  name: { type: String, required: true },
  location: String,
  // logo: { data: Buffer, contentType: String },
  websiteURL: String,
});

// universitySchema.virtual('docxTemplate').get(function () {
//   const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documents' });
//   return bucket.openDownloadStream(this._id);
// });

const University = mongoose.model('University', universitySchema);

module.exports = University;

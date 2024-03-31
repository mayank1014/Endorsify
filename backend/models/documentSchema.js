const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const documentSchema = new mongoose.Schema({
    filename: String,
    uploadDate: Date,
    docxFile: String,
    studentEmail: { type: String, required: true },
    universityEmail: { type: String, required: true },
    professorEmail: { type: String, required: true },
  });

// documentSchema.virtual('docxFile').get(function () {
//   const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'documents' });
//   return bucket.openDownloadStream(this._id);
// });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;

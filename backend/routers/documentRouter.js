const express = require('express');
const router = express.Router();
const Document = require('../models/documentSchema');

// Route to get all documents associated with a specific university email
router.get('/getall/:universityEmail', async (req, res) => {
  try {
    const documents = await Document.find({ universityEmail: req.params.universityEmail });
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add more routes as needed, like route to upload documents, delete documents, etc.

module.exports = router;

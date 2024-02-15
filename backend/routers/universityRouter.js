const express = require("express");
const router = express.Router();

const University = require("../models/universitySchema");

router.get("/getAllUniversities", async (req, res) => {
    try {
      const universities = await University.find();
      res.send(universities);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const existingUniversity = await University.findOne({ uniId: req.body.uniId });
  
      if (existingUniversity) {
        console.log(existingUniversity);
        return res.json({ error: 1 });
      } else {
        const newUniversity = new University(req.body);
        console.log(newUniversity);
        await newUniversity.save();
        return res.json({ error: 0 });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message });
    }
  });
  

module.exports = router;

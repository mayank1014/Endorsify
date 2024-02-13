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
    // const { username, password, confirmPassword } = req.body;
  
    try {
    //   if (password !== confirmPassword) {
    //     return res.json({ error: 1 });
    //   } else if (await User.findOne({ username , password })) {
    //     return res.json({ error: 2 });
    //   } else {
    //     req.body.role = "student";
        const newUniversity = new University(req.body);
        await newUniversity.save();
        return res.json(newUniversity);
    //   }
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;

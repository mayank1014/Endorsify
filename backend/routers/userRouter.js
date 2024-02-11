const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email : email, password : password });
  
      if (user) {
        res.send(user);
      } else {
        res.status(400).json(error);
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.post("/register", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
  
    try {
      if (password !== confirmPassword) {
        return res.json({ error: 1 });
      } else if (await User.findOne({ username , password })) {
        return res.json({ error: 2 });
      } else {
        req.body.role = "student";
        const newuser = new User(req.body);
        await newuser.save();
        return res.json({ error: 0, user: newuser });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router;

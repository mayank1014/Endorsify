const express = require("express");
const router = express.Router();

const User = require("../models/userSchema");

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    
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
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.send("Successfully Registered");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/checkuser", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.json({ error: 1 });
    } else if (await User.findOne({ email })) {
      return res.json({ error: 2 });
    } else {
      return res.json({ error: 0 });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.body.email });
    res.send("User deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

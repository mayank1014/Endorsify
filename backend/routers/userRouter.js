const express = require("express");
const router = express.Router();
const app = express();
const User = require("../models/userSchema");
const nodemailer=require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

router.get("/getallusers", async (req, res) => {
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
    console.log(error)
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

router.post("/changepassword", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    user.password = req.body.password;

    await user.save();

    res.send("Password updated successfully");
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

router.post("/hello", async (req, res) => {
  res.send("Hello");
});

const sendresetPasswordMail= async(email, token)=>{
  try{
    const transporter= nodemailer.createTransport({
      service:"gmail",
      port:465,
      secure: true,
      logger:true,
      debug:true,
      secureConnection: false,
      auth:{
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls:{
        rejectUnauthorized:true
      }
    });
    const mailOptions={
      from:process.env.EMAIL_USERNAME,
      to:email,
      subject: 'Reset Password',
      html:`<p> OTP to reset password is: ${token}</p>`
    }
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);
      }
      else{
        console.log("Mail sent Successfully", info.response);
      }
    })
  }catch(error){
    console.log("Mail not sent");
  }
}

router.get("/getuser/:email/:randomnumber", async (req, res) => {
  const randomString=req.params.randomnumber;
  const email = req.params.email;
  try {
    const userdata = await User.findOne({ email: email });
    console.log(userdata);
    if(userdata){
      //  const data= await User.updateOne({email: email},{$set:{token: randomString}});
      console.log(randomString);
       sendresetPasswordMail(userdata.email,randomString);
       res.status(200).send(userdata);
    }
    else{
      return res.status(200).send({msg:"User does not exist"});
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/forgotpassword/changepassword/:email/:password", async (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  try {
    const user = await User.findOne({ email: email });
    user.password = password;

    await user.save();

    res.send("Password updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

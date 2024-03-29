// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 8000;
// const dbConnection = require("./db");


// const userRouter = require("./routers/userRouter");
// const universityRouter = require("./routers/universityRouter");
// const professorRouter = require("./routers/professorRouter");
// const StudentRouter = require("./routers/studentRouter");

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cors());

// app.use(express.json());
// app.use(cors({ origin: "*" }));
// app.use(express.urlencoded({ extended: false }));

// /* ------------------- */
// const Docxtemplater = require("docxtemplater");
// const fs = require("fs");
// const path = require("path");
// const { profile } = require("console");
// /* ------------------- */


// app.use("/api/dummy", (req, res) => {
//   console.log(req.body)
//   const { spawn } = require("child_process");
//   const pythonPath = '/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12';
//   const pythonScriptPath = "recLetter.py";

//   // Define the JSON object to pass
//   const jsonObject = req.body;

//   // Stringify the JSON object
//   const jsonString = JSON.stringify(jsonObject);

//   // Spawn a child process to run the Python script
//   const pythonProcess = spawn(pythonPath, [pythonScriptPath, jsonString]);

//   // Handle stdout data from the Python script
//   pythonProcess.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   // Handle stderr data from the Python script
//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   // Handle completion of the Python script
//   pythonProcess.on("close", (code) => {
//     console.log(`Python script process exited with code ${code}`);
//   });

//   res.send("Hello");
// });

// app.get("/download/docx", (req, res) => {
//   try {
//     // Specify the path to your existing DOCX file
//     const filePath = path.join(__dirname, 'Template.docx'); // Replace 'sample.docx' with your actual filename

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//     res.setHeader('Content-Disposition', 'attachment; filename=sample.docx'); // Or use the original filename if desired

//     // Send the existing DOCX file content
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error('Error serving DOCX file:', error);
//     res.status(500).send('Error downloading DOCX file');
//   }
// });

// app.use("/api/users/", userRouter);
// app.use("/api/universities/", universityRouter);
// app.use("/api/professors/", professorRouter);
// app.use("/api/students/", StudentRouter);

// app.listen(port, () => console.log(`Node JS server started on port ${port}`));


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User=require('./models/userSchema')
require("dotenv").config();

const app = express();
app.use(cors({
  origin: '*'
}));
const port = process.env.PORT || 8000;
const dbConnection = require("./db");

const session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

// app.options('/auth/google/callback', cors());
app.get('/register', (req, res) => res.send(userProfile));
app.get('/', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '61711682641-j3m4e7akio69fv1qrjt0ple1lc1mt8ls.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
    User.findOne({ email: req.user.emails[0].value }).exec()
      .then(existingUser => {
        if (existingUser) {
          let redirectUrl;
          if (existingUser.role === "student") {
            redirectUrl = "http://localhost:3000/student/home";
          } else if (existingUser.role === "professor") {
            redirectUrl = "http://localhost:3000/professor/home";
          } else if (existingUser.role === "university") {
            redirectUrl = "http://localhost:3000/university/students";
          }

          res.cookie('users',  req.user._json);

          return res.redirect(redirectUrl);
        } else {
          // User does not exist, redirect to registration page with email
          const email = req.user.emails[0].value;
          return res.redirect(`http://localhost:3000/register?email=${email}`);
        }
      })
      .catch(err => {
        // Handle error finding user
        console.error('Error finding user:', err);
        return res.redirect('http://localhost:3000/');
      });
  });


const userRouter = require("./routers/userRouter");
const universityRouter = require("./routers/universityRouter");
const professorRouter = require("./routers/professorRouter");
const StudentRouter = require("./routers/studentRouter");

app.use(bodyParser.json({ limit: "50mb" }));


app.use(express.json());
// app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

/* ------------------- */
// const Docxtemplater = require("docxtemplater");
// const fs = require("fs");
// const path = require("path");
/* ------------------- */

const University = require("./models/universitySchema");
// const pythonPath = '/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12';

app.use("/api/dummy", (req, res) => {

  console.log(req.body)

  University.findOne({ _id: req.body.uniId })
  .exec()
  .then(university => {
    const { spawn } = require("child_process");

    const pythonScriptPath = "recLetter.py";

    // Define the JSON object to pass
    const jsonObject = {
      ...req.body,
      "docxFile" : university.docxFile,
    }

    // Stringify the JSON object
    const jsonString = JSON.stringify(jsonObject);

    // Spawn a child process to run the Python script
    const pythonProcess = spawn("python", [pythonScriptPath, jsonString]);

    // Handle stdout data from the Python script
    pythonProcess.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    // Handle stderr data from the Python script
    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    // Handle completion of the Python script
    pythonProcess.on("close", (code) => {
      console.log(`Python script process exited with code ${code}`);
    });
  })
  .catch(error => {
    console.error("Error fetching university:", error);
  });

  res.send("Hello");
});

// app.get("/download/docx", (req, res) => {
//   try {
//     // Specify the path to your existing DOCX file
//     const filePath = path.join(__dirname, 'Template.docx'); // Replace 'sample.docx' with your actual filename

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
//     res.setHeader('Content-Disposition', 'attachment; filename=sample.docx'); // Or use the original filename if desired

//     // Send the existing DOCX file content
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error('Error serving DOCX file:', error);
//     res.status(500).send('Error downloading DOCX file');
//   }
// });

app.use("/api/users/", userRouter);
app.use("/api/universities/", universityRouter);
app.use("/api/professors/", professorRouter);
app.use("/api/students/", StudentRouter);

app.listen(port, () => console.log(`Node JS server started on port ${port}`));

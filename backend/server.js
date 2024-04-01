const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User=require('./models/userSchema')
const Document = require('./models/documentSchema')
const Professor = require('./models/professorSchema')
const University = require("./models/universitySchema");
const Student = require("./models/studentSchema");

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
          // res.cookie('isLoggedIn', "true");
          // res.cookie('role', existingUser.role);

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
const studentRouter = require("./routers/studentRouter");
const documentRouter = require("./routers/documentRouter");

app.use(bodyParser.json({ limit: "50mb" }));


app.use(express.json());
// app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
// const pythonPath = '/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12';

app.use("/api/dummy", async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.body.studentId }).exec();
    const university = await University.findOne({ _id: req.body.uniId }).exec();

    if (!student || !university) {
      throw new Error("Student or University not found");
    }

    const { spawn } = require("child_process");
    const pythonScriptPath = "recLetter.py";

    const jsonObject = {
      ...req.body,
      studentEmail: student.email,
      universityEmail: university.email,
      uniName: university.name,
      docxFile: university.docxFile,
    };

    // Stringify the JSON object
    const jsonString = JSON.stringify(jsonObject);

    // Initialize a variable to store stdout data
    let pythonOutput = "";

    // Spawn a child process to run the Python script
    const pythonProcess = spawn("/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12", [pythonScriptPath, jsonString]);

    // Handle stdout data from the Python script
    pythonProcess.stdout.on("data", (data) => {
      pythonOutput += data.toString(); // Accumulate stdout data
    });

    // Handle stderr data from the Python script
    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    // Handle completion of the Python script
    pythonProcess.on("close", async (code) => {
      console.log(`Python script process exited with code ${code}`);
      try {
        // Extract the URL from the stdout data
        const url = pythonOutput.trim(); // Remove leading/trailing whitespace
        console.log(url);

        const newDocument = new Document({
          filename: jsonObject.firstName + " " + jsonObject.middleName + " " + jsonObject.lastName,
          uploadDate: new Date(),
          docxFile: url,
          studentEmail: jsonObject.studentEmail,
          universityEmail: jsonObject.universityEmail,
          professorEmail: jsonObject.professorEmail,
        });

        await newDocument.save();

        const professorId = jsonObject.professorId;
        const studentId = jsonObject.studentId;

        const professor = await Professor.findOne({ _id: professorId }).exec();
        if (!professor) {
          console.log("Not Found p")
        }
        const studentIndex = professor.students.findIndex((student) => student.studentId === studentId);
          if (studentIndex === -1) {
            console.log("Student not found in professor's students");
          }
          professor.students[studentIndex].docx = url;
          professor.students[studentIndex].lorStatus = "accepted";
          await professor.save(); 

          const student = await Student.findOne({ _id: studentId }).exec();
          if (!student) {
            console.log("Not Found Student")
          }
          const professorIndex = student.teachers.findIndex((teacher) => teacher.professorId === professorId);
            if (professorIndex === -1) {
              console.log("Professor not found in student's professors");
            }
            student.teachers[professorIndex].docx = url;
            student.teachers[professorIndex].lorStatus = "accepted";
            console.log(student)
            await student.save(); 

      } catch (error) {
        console.error("Error handling Python script output:", error);
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Error processing request" });
  }
  res.send("LOR Generated Successfully");
});

app.use("/api/users/", userRouter);
app.use("/api/universities/", universityRouter);
app.use("/api/professors/", professorRouter);
app.use("/api/students/", studentRouter);
app.use("/api/documents/", documentRouter);

app.listen(port, () => console.log(`Node JS server started on port ${port}`));

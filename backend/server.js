const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
const dbConnection = require("./db");

const userRouter = require("./routers/userRouter");
const universityRouter = require("./routers/universityRouter");
const professorRouter = require("./routers/professorRouter");
const StudentRouter = require("./routers/studentRouter");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

/* ------------------- */
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
/* ------------------- */

app.use("/api/dummy", (req, res) => {
  console.log(req.body)
  const { spawn } = require("child_process");

  const pythonScriptPath = "recLetter.py";

  // Define the JSON object to pass
  const jsonObject = req.body;

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

  res.send("Hello");
});

app.get("/download/docx", (req, res) => {
  try {
    // Specify the path to your existing DOCX file
    const filePath = path.join(__dirname, 'Template.docx'); // Replace 'sample.docx' with your actual filename

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=sample.docx'); // Or use the original filename if desired

    // Send the existing DOCX file content
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving DOCX file:', error);
    res.status(500).send('Error downloading DOCX file');
  }
});

app.use("/api/users/", userRouter);
app.use("/api/universities/", universityRouter);
app.use("/api/professors/", professorRouter);
app.use("/api/students/", StudentRouter);

app.listen(port, () => console.log(`Node JS server started on port ${port}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;
const dbConnection = require("./db");

const userRouter = require('./routers/userRouter')
const universityRouter = require('./routers/universityRouter')
const professorRouter = require('./routers/professorRouter')
const StudentRouter = require('./routers/studentRouter')

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', userRouter)
app.use('/api/universities/', universityRouter)
app.use('/api/professors/', professorRouter)
app.use('/api/students/', StudentRouter)

app.listen(port, () => console.log(`Node JS server started on port ${port}`));

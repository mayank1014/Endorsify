const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Node JS server started on port ${port}`));

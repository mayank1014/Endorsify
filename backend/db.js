const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/endorsify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB connection successful");
  });

  connection.on("error", (err) => {
    console.log("MongoDB connection error:", err);
  });
}

connectDB();

module.exports = mongoose;

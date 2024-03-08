const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb+srv://shivam:shivam123@cluster0.jksp5cl.mongodb.net/Endorsify", {
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

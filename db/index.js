const mongoose = require("mongoose");

const config = require("../config");

mongoose
  .connect(
    `mongodb://${config.database.url}/${config.database.name}?keepAlive=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;

const mongoose = require("mongoose");

const charactersSchema = new mongoose.Schema({
  id: { type: "Number", required: true, unique: true },
  name: { type: "String", required: true },
  description: String,
  dateAdded: { type: "Date", default: Date.now, required: true },
  thumbnail: { type: "String" },
});

module.exports = mongoose.model("Character", charactersSchema);

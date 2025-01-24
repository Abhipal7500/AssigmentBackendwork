const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
  prizesWon: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);

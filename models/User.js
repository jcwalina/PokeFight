const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    unique: [true, "Username already exist"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  gamesWon: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", User);

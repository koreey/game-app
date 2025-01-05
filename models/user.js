const mongoose = require("mongoose");
// Shortcut variable
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
  comments: {
  },
  content:
{
  type: String,
  required: true
},
author:{
  type: String,
  required: true
}
}, {
timestamps: true
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
applications: [applicationSchema]
});

module.exports = mongoose.model("User", userSchema);

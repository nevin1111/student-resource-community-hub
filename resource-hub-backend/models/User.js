const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  admissionNumber: {
    type: String,
    required: true
  },

  joinYear: {
    type: Number,
    required: true,
    min: 1900,
    max: 2099
  },

  endYear: {
    type: Number,
    required: true,
    min: 1900,
    max: 2099
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;

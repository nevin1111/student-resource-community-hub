const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  totalSemesters: {
    type: Number,
    required: true
  }
});

const DepartmentModel = mongoose.model('Department', DepartmentSchema);

module.exports = DepartmentModel;

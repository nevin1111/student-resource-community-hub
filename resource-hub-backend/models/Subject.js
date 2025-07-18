const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  departmentCode: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  }
});

const SubjectModel = mongoose.model('Subject', SubjectSchema);

module.exports = SubjectModel;

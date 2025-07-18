const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  departmentCode: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileUrl: {
    type: String,
    required: true // file must be uploaded
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  }
});

const NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel;

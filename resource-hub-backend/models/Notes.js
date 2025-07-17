const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    semester: String,
    department: String,
    noteURL: String,
    uploadedBy: String,
    date: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: Number,
        default: 0
    }
});

const NoteModel = mongoose.model('notes', NoteSchema);
module.exports = NoteModel


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const NoteModel = require('./models/Notes')
const UserModel = require('./models/User');
const DepartmentModel = require('./models/Department');
const SubjectModel = require('./models/Subject');
const multer = require('multer');
const path = require('path');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// File upload setup
const storage = multer.diskStorage({
    destination: './uploads/', // folder where files will be stored
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));


mongoose.connect('mongodb+srv://nevin1111:internalmarkmongo@cluster0.ltgqnuy.mongodb.net/communityHub?retryWrites=true&w=majority&appName=Cluster0')

// Register
app.post('/register', (req, res) => {
    console.log(req.body)

    UserModel.findOne({ email: req.body.email })
        .then(existingUser => {
            if (existingUser) {
                res.json({
                    status: 'fail',
                    message: 'Email already registered'
                })
            } else {
                let user = new UserModel(req.body)
                user.save()

                res.json({
                    status: 'success',
                    message: 'User registered successfully'
                })
            }
        }).catch(() => {
            res.json({ status: 'error', message: 'Error during registration' })
        })
})


// Login
app.post('/login', (req, res) => {
    console.log(req.body)

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: 'error',
            message: 'Email and password required'
        })
    }

    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.json({
                    status: 'fail',
                    message: 'Email not found'
                })
            } else if (user.password !== req.body.password) {
                res.json({
                    status: 'fail',
                    message: 'Incorrect password'
                })
            } else {
                res.json({
                    status: 'success',
                    message: 'Login successful',
                    userId: user._id,
                    name: user.name
                })
            }
        }).catch(() => {
            res.json({ status: 'error', message: 'Login error' })
        })
})

app.post('/addnote', (req, res) => {
    console.log(req.body)
    let data_store = new NoteModel(req.body)
    data_store.save()

    res.json({
        "status": "success"
    })
})


app.get('/viewnotes', (req, res) => {
  const { departmentCode, semester, subjectName } = req.query;

  const filter = {};
  if (departmentCode) filter.departmentCode = departmentCode;
  if (semester) filter.semester = semester;
  if (subjectName) filter.subjectName = subjectName;

  NoteModel.find(filter)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: 'Server error' }));
});



app.get('/departments', (req, res) => {
    DepartmentModel.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: 'Failed to fetch departments' }));
})



app.get('/subjects/:dept/:sem', (req, res) => {
    const { dept, sem } = req.params;
    SubjectModel.find({ departmentCode: dept, semester: sem })
        .then(subjects => res.json(subjects))
        .catch(() => res.status(500).json({ status: 'error', message: 'Failed to fetch subjects' }));
});


app.post('/upload', upload.single('file'), (req, res) => {
    const { title, subjectName, semester, departmentCode, uploadedBy } = req.body;

    if (!req.file || !title || !subjectName || !semester || !departmentCode || !uploadedBy) {
        return res.status(400).json({ status: 'fail', message: 'Missing required fields or file' });
    }

    const newNote = new NoteModel({
        title,
        subjectName,
        semester,
        departmentCode,
        uploadedBy,
        fileUrl: `/uploads/${req.file.filename}`
    });

    newNote.save()
        .then(() => {
            res.json({
                status: 'success',
                message: 'Note uploaded successfully'
            });
        })
        .catch((err) => {
            console.error('Error saving note:', err);
            res.status(500).json({ status: 'error', message: 'Failed to save note' });
        });
});





app.listen(4000, () => {
    console.log('Server running on port 4000')
})

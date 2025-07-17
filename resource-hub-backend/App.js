const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const NoteModel = require('./models/Notes')
const UserModel = require('./models/User');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
    NoteModel.find().then(
        (items) => {
            res.json(items)
        }).catch(() => {
            res.json({ status: 'error', message: 'Error during registration' })
        })
})

app.listen(4000, () => {
    console.log('Server running on port 4000')
})

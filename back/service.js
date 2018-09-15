const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const User = require('./models/user.js')
const auth = require("./auth")
const Post = require('./models/post')
const config = require('./config/config')

mongoose.Promise = Promise


app.use(cors())
app.use(bodyParser.json())

// app.post('/post', (req, res) => { 
//     res.send(post);
// })
app.get('/posts/:id', async (req, res) => {
    var author = req.params.id
    var posts= await Post.find({author})
    res.send(posts)
})
app.post('/post', (req, res) => {


    var postData= req.body;
    postData.author= '5b63a8331d4b5a2f70dbcfdb'
    var post = new Post(postData)
    console.log(post)
    post.save((err, result) => {
        if (err) {
            console.error("saving post error")
            return res.status(500).send({messages: "saving post error"})
        }

        else {
            res.sendStatus(200)
        }
    })
})

app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-password -__v')
        res.send(users)
    }
    catch (error) {
        console.error(error)
        res.send(500)
    }
})

app.get('/profile/:id', async (req, res) => {

    try {
        var user = await User.findById(req.params.id, '-password -__v')
        res.send(user)
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
    }

})

app.post('/register', auth.register)

app.post('/login', auth.login)


mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected database.');
    }
});


app.listen(7000); 
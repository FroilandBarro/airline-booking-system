const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const config = require('./config/config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected database.');
    }
});

const port = process.env.PORT || 8080;
const env = (port === 8080 ? 'development' : 'productions')

// // Add headers
// app.use((req, res, next) => {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// load routes
const flights = require('./routes/flights');

const auth = require("./auth");

app.use('/api/flights', flights);


app.listen(port, () => {
    console.log(`Server is in ${env} at port ${port}.`);
}); 
// Dependencies
// I do now know what they all do. 
// I follow tutorial from Traversy Media on YouTube
// https://www.youtube.com/watch?v=DQ9pZ2NKXRo&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ&index=1
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connected to database
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error when connected to database
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Initialize express
const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// Cors Middleware
// Make request to API from different domain name???
app.use(cors());

// Express session middleware
const session = require('express-session');
app.use(session({ secret: 'SECRET' }));

// Set static folder as 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// All 'users' route will go here
app.use('/users', users);

// Indes route
// Route to '/' A.K.A homepage for now
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Starting up server on 'port'
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
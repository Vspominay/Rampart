const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const route = require('./routes/routing');
const Account = require('./models/account');
var session = require('express-session');

const app = express();

// const port = 3000;
const port = process.env.PORT || 8080;

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Project has been connected to the mongo');
});

mongoose.connection.on('error', (err) => {
    console.warn(`Somethig error ${err}`);
})

app.use('/', route);

app.get('/', (req, res) => {
    res.send('Главная страница сайта');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is ready, port: ${port}`);
})
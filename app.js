const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

const session = require('express-session');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/projectDB')
    

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(passport.initialize());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


app.use('/', userRoutes);
app.use('/', projectRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

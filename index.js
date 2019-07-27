const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const passport = require ('passport');
const multer = require ('multer');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./config/database');
const users = require('./routes/users');
const {ensureAuthenticated} = require('./config/auth');

const app = express();

// Passport Config
require('./config/passport')(passport);

//Body Parser for data handling
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); 

//Set express handlebars as template engine
app.engine ('handlebars', hbs({ 
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set ('views', path.join(__dirname + '/views'));
app.set ('view engine', 'handlebars');

//set image upload storage
// const storage = multer.diskStorage({
//     destination: `/public/img/`,
//     filename: (req, file, cb) => {
//         cb (null, file.fieldname +'-' + Date.now() + path.extname(file.originalname) )
//     }
// });

//Init Upload
// const upload = multer({
//     storage: storage
// }).any();

// Using Static folder for external css and images
app.use (express.static('./public'));

//Express Session middleware
app.use(session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

//Flash
app.use(flash());


//Global Variables
app.use ((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//for index page
app.get('/', (req, res) => {
    res.render('index');
});


//for registration page
// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(req.file.path);
//         }
//     })
// });


//for registration page
app.get('/register', (req, res) => {
    res.render('register');
});

//for login page
app.get('/login', (req, res) => {
    res.render('login');
});

//for dashboard page
app.get('/user/dashboard', ensureAuthenticated, (req, res) => {
    res.render('users/dashboard', {
        user: req.user
    });
});

//for edit profile page
app.get('/user/profile', ensureAuthenticated, (req, res) => {
    res.render('users/profile');
});

//for change password page
app.get('/user/changepassword', ensureAuthenticated, (req, res) => {
    res.render('users/changepassword');
});

//Use Routes
app.use('/user', users);


app.listen (PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
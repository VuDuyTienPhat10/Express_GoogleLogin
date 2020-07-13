const express = require('express');
const path = require('path');
const session = require('express-session');
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ path: './config/config.env' });
}

const app = express();
// Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
const connectDB = require('./config/db');
connectDB();



// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//handlebars helpers:
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/hbs')

//handlebars:
var exphbs = require('express-handlebars');
app.set('view engine', 'hbs');
// app.set('view engine', 'handlebars');//=> dòng này dẫn tới LỖI
app.engine('hbs', exphbs({
    helpers: {
        formatDate,
        truncate,
        stripTags,
        editIcon
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));
//body-parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());//chấp nhận post json từ postman chẳng hạn, hay angular
//session:

app.use(session({
    secret: 'đây là bí mật',
    resave: false, // nếu k có gì thay đổi thì k lưu lại
    saveUninitialized: false, //tức là k lưu tạo session cho tới khi something đc store
    store: new MongoStore({ mongooseConnection: mongoose.connection }),

}));




//passport:
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

//set global var:
app.use(function (req, res, next) {
    res.locals.USER=req.user;
    next();
})



// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/stories', require('./routes/stories.route'));
// app.use('/stories', require('./routes/stories'));




const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


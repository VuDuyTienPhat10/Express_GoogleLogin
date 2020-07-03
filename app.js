const express = require('express');
const path=require('path')
require('dotenv').config({ path: './config/config.env' });
const app = express();
app.set('views', path.join(__dirname, 'views'));
const connectDB = require('./config/db');
connectDB();



// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//handlebars:
var exphbs  = require('express-handlebars');
app.set('view engine', 'hbs');
// app.set('view engine', 'handlebars');//=> dòng này dẫn tới LỖI
app.engine('handlebars', exphbs({
    defaultLayout:'layouts/main',
    extname:'.hbs'
}));


app.get('/', function (req, res) {
    res.render('layouts/login');
});





// Routes
// app.use('/', require('./routes/index'))
// app.use('/auth', require('./routes/auth'))
// app.use('/stories', require('./routes/stories'));




const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

